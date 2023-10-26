import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="sticky rounded-t">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      colSpan={header.colSpan}
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex justify-evenly text-left font-semibold text-gray-600 dark:text-white">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="min-w-[180px] border-white/0 py-3 pr-4 text-left first:pl-4"
                      key={cell.id}
                    >
                      <div className="flex justify-evenly text-left text-gray-600 dark:text-white">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mx-2 mt-4 flex flex-wrap justify-between gap-2 md:flex-nowrap md:items-center">
        <div className="flex items-center text-sm md:w-full md:text-base">
          Total Records: {data.length ?? 0}
        </div>

        <span className="flex items-center gap-1 md:w-full">
          <div className="flex items-center text-sm md:text-base">
            Current Page: {table.getState().pagination.pageIndex + 1} | Total
            Pages: {data.length == 0 ? 1 : table.getPageCount()}
          </div>
        </span>

        <div className="flex w-full  items-center justify-center gap-3 md:w-full md:items-start md:justify-end">
          <Button
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:bg-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-700 dark:text-black md:w-auto md:text-lg"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:bg-gray-600 focus:outline-none active:bg-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-700 dark:text-black md:w-auto md:text-lg"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
