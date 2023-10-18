"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";

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
  },
];
