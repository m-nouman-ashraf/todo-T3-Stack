import React from "react";
// import { RouterOutputs } from "~/trpc/shared";

// type TodoWithUser = RouterOutputs["todo"]["getAllTodos"];
const AllTodos = () => {
  //   const data = api.todo.getAll.query();
  //   const data = api.todo.addToDo
  //   console.log("data", data);
  return (
    <div className="container mt-20 flex items-center justify-center ">
      <h1 className="text-2xl font-bold">All Todos</h1>
      {/* <ul>
            {data?.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul> */}
    </div>
  );
};

export default AllTodos;
