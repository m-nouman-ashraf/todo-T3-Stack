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
export type Todo = {
  id: number;
  title: string;
  description: string | null;
  dueDate: Date | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [searchTitle, setSearchTitle] = useState<string | null>("");
  const [filterType, setFilterType] = useState<FilterType>(null);
  const ctx = api.useContext();
  const { data, isLoading } = api.todo.getAllTodos.useQuery({
    endDate: dateRange?.from,
    startDate: dateRange?.to,
    title: searchTitle ?? "",
  });
  const { mutate, isLoading: statusLoading } =
    api.todo.updateTodoStatus.useMutation({
      onSuccess: () => {
        toast.success("Task Mark as Completed");
        void ctx.invalidate();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  const changeStatus = (values: number) => {
    const newValues = { status: true, id: Number(values) };
    mutate(newValues);

    console.log(values);
  };
  if (!data) return null;
  const dataKey = data.map((key) => {
    return key.id;
  });
  if (isLoading) return <LoadingPage />;
  const handleSearchText = debounce((e: string) => {
    console.log("e", e);
    setSearchTitle(e);
  }, 300);
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
      size: 100,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex w-full items-end justify-end gap-4">
            {status ? null : (
              <Toggle
                variant={"outline"}
                disabled={statusLoading}
                onClick={() => changeStatus(row.original.id)}
              >
                {statusLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Completed
              </Toggle>
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
    setFilterType(null);
  };

  return (
    <div className="mt-20 flex sm:flex-col md:items-center  lg:mx-20 ">
      <Card className="flex w-[400px] grow flex-col bg-white box-decoration-clone shadow-2xl md:w-[700px] lg:w-full">
        <CardHeader className="flex w-full flex-row  justify-center">
          <CardTitle className=" text-center text-3xl font-extrabold">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent className="flex grow flex-col gap-6">
          <CreateTodo />
          <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
            <DropdownMenuDemo onFilterSelect={setFilterType} />
            {filterType !== null && renderFilterComponent()}
            {filterType !== null && (
              <Button className="w-full md:w-44" onClick={resetFilter}>
                Reset Filter
              </Button>
            )}
            <DeleteALLTodo />
          </div>
          <AllTodos columns={columns} data={data} key={Number(dataKey)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
