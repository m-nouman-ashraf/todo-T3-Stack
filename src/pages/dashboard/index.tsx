import React, { useState } from "react";
import CreateTodo from "~/components/addTodo/CreateTodo";
import AllTodos from "~/components/allTodo/AllToDo";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenuDemo } from "~/components/filters/FilterTodo";
import { FilterType } from "~/components/filters/FilterTodo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DatePickerWithRange } from "~/components/DatePicker";
import { DateRange } from "react-day-picker";
import { debounce } from "lodash";
import { Badge } from "~/components/ui/badge";
import { DeleteTodo } from "~/components/deleteTodo/DeleteTodo";
import { EditTodo } from "~/components/editTodo/EditTdo";
import { Toggle } from "~/components/ui/toggle";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { DeleteALLTodo } from "~/components/deleteTodo/DeleteAllTodo";
import { Loader2 } from "lucide-react";
import Navbar from "~/components/Navbar";
import { CheckCircle2 } from "lucide-react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { generateSSRHelper } from "~/server/helper/ssrHelper";
import { ParsedUrlQuery } from "querystring";
export type Todo = {
  id: number;
  title: string;
  description: string | null;
  dueDate: Date | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

interface DashboardProps {
  data: Todo[];
}
interface TodoFilterParams extends ParsedUrlQuery {
  status?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
}
const Dashboard: NextPage<DashboardProps> = () =>
  // props: InferGetServerSidePropsType<typeof getServerSideProps>,
  {
    // console.log("props", props);
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const [searchTitle, setSearchTitle] = useState<string | null>("");
    const [filterType, setFilterType] = useState<FilterType>(null);
    const ctx = api.useContext();
    const { data, isLoading } = api.todo.getAllTodos.useQuery({
      endDate: dateRange?.from,
      startDate: dateRange?.to,
      title: searchTitle ?? "",
      filterType: filterType ?? "All",
    });
    const { mutate, isLoading: statusLoading } =
      api.todo.updateTodoStatus.useMutation({
        onSuccess: () => {
          toast.success("Task Mark as Completed");
          setSearchTitle("");
          setFilterType(null);
          void ctx.todo.invalidate();
        },
        onError: () => {
          toast.error("Something went wrong");
          setSearchTitle("");
          setFilterType(null);
          void ctx.todo.invalidate();
        },
      });

    const changeStatus = (values: number) => {
      const newValues = { status: true, id: Number(values) };
      mutate(newValues);
    };

    if (isLoading) return <LoadingPage />;
    const handleSearchText = debounce((e: string) => {
      setSearchTitle(e);
    }, 2000);
    const columns: ColumnDef<Todo>[] = [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "description",
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
          const date = row.original.dueDate;
          return date ? date.toLocaleDateString() : null;
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return status ? (
            <Badge variant="default">Completed</Badge>
          ) : (
            <Badge variant="destructive">Pending</Badge>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <div className="flex w-full items-end justify-end gap-4">
              {status ? null : (
                <Button
                  key={row.original.id}
                  variant={"outline"}
                  disabled={statusLoading}
                  className="flex items-center gap-2"
                  onClick={() => changeStatus(row.original.id)}
                >
                  {statusLoading ? (
                    <Loader2
                      key={row.original.id}
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Completed
                    </>
                  )}
                </Button>
              )}

              <EditTodo status={status} id={row.original.id} />
              <DeleteTodo id={row.original.id} />
            </div>
          );
        },
      },
    ];
    const renderFilterComponent = () => {
      switch (filterType) {
        case "Search By Name":
          return (
            <Input
              className="w-full md:w-44"
              type="text"
              placeholder="Enter name..."
              onChange={(e) => handleSearchText(e.target.value)}
            />
          );
        case "Search By Date":
          return (
            <DatePickerWithRange
              onDateRangeSelect={(selectedDateRange) => {
                setDateRange(selectedDateRange);
              }}
            />
          );
        default:
          return null;
      }
    };
    const resetFilter = () => {
      setSearchTitle("");
      setFilterType(null);
      void ctx.todo.invalidate();
    };

    return (
      <>
        <div className="">
          <Navbar />
        </div>
        <div className="mt-20 flex sm:flex-col md:items-center  lg:mx-20 ">
          <Card className="flex w-[400px] grow flex-col bg-white box-decoration-clone shadow-2xl dark:bg-[#030816] md:w-[700px] lg:w-full">
            <CardHeader className="flex w-full flex-row  justify-center">
              <CardTitle className=" text-center text-3xl font-extrabold dark:text-white">
                Todo List
              </CardTitle>
            </CardHeader>
            <CardContent className="flex grow flex-col gap-6">
              <CreateTodo />
              <div className="mt-5 flex w-full flex-col justify-between gap-4 md:flex-row">
                <DropdownMenuDemo onFilterSelect={setFilterType} />
                {filterType !== null && renderFilterComponent()}
                {filterType !== null && (
                  <Button className="w-full md:w-44" onClick={resetFilter}>
                    Reset Filter
                  </Button>
                )}
                <DeleteALLTodo />
              </div>
              <AllTodos columns={columns} data={data ?? []} />
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const ssg = generateSSRHelper();
//   await ssg.todo.getAllTodos.prefetch({});

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//     },
//   };
// };

export default Dashboard;
