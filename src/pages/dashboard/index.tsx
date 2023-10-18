import React from "react";
import CreateTodo from "~/components/addTodo/CreateTodo";
import AllTodos from "~/components/allTodo/AllToDo";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/Loader";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { columns } from "~/components/allTodo/columns";
const Dashboard = () => {
  const { user } = useUser();
  console.log("user", user);
  const { data, isLoading } = api.todo.getAllTodos.useQuery();

  console.log("data", data);
  if (!data) return null;
  const dataKey = data.map((key) => {
    return key.id;
  });
  if (isLoading) return <LoadingPage />;
  return (
    <div className="container mt-20 flex items-center justify-center ">
      <Card className="flex w-[600px] grow flex-col bg-white box-decoration-clone shadow-2xl">
        <CardHeader className="flex w-full flex-row  justify-center">
          <CardTitle className=" text-center text-3xl font-extrabold">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent className="flex grow flex-col gap-6">
          <CreateTodo />
          <AllTodos columns={columns} data={data} key={Number(dataKey)} />
        </CardContent>
      </Card>
    </div>
    // <div className="container mt-20 flex flex-col items-center justify-center ">
    //   <CreateTodo />
    //   <AllTodos />
    // </div>
  );
};

export default Dashboard;
