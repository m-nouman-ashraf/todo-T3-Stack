"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { EditTodo } from "../editTodo/EditTdo";
import { DeleteTodo } from "../deleteTodo/DeleteTodo";
import React from "react";
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

export const columns: ColumnDef<Todo>[] = [
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
      console.log("row", row.original.id);
      return (
        <div className="flex w-full items-end justify-end gap-4">
          <EditTodo id={row.original.id} />
          <DeleteTodo id={row.original.id} />
        </div>
      );
    },
  },
];
