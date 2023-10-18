import React from "react";
import CreateTodo from "~/components/addTodo/CreateTodo";
import AllTodos from "~/components/allTodo/AllToDo";

const Dashboard = () => {
  return (
    <div className="container mt-20 flex flex-col items-center justify-center ">
      <CreateTodo />
      <AllTodos />
    </div>
  );
};

export default Dashboard;
