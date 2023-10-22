import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const toDoRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.todo.create({
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          userId: userId,
        },
      });
    }),
  editTodoById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.todo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
        },
      });
    }),

  updateTodoStatus: publicProcedure
    .input(
      z.object({
        status: z.boolean(),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.update({
        where: { id: input.id },
        data: {
          status: input.status,
        },
      });
    }),
  getAllTodos: privateProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        title: z.string().optional(),
        filterType: z
          .union([
            z.literal("Search By Name"),
            z.literal("Search By Date"),
            z.literal("All"),
            z.literal("Completed"),
            z.literal("Pending"),
          ])
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Prisma.TodoWhereInput = { userId: ctx.userId };

      if (input.startDate && input.endDate) {
        where.dueDate = {
          gte: input.startDate,
          lte: input.endDate,
        };
      }

      if (input.title) {
        where.title = {
          contains: input.title,
        };
      }
      if (input.filterType === "Completed") {
        where.status = true;
      } else if (input.filterType === "Pending") {
        where.status = false;
      }

      const todos = await ctx.db.todo.findMany({
        where: where,
      });

      return todos;
    }),
  getTodoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const singleTodo = await ctx.db.todo.findUnique({
        where: { id: Number(input.id) },
      });
      if (!singleTodo) throw new TRPCError({ code: "NOT_FOUND" });
      return singleTodo;
    }),

  deleteTodoById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });

      if (!todo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.db.todo.delete({
        where: { id: input.id },
      });

      return todo;
    }),
  deleteAllTodos: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.db.todo.deleteMany({});

    return { message: "All todos deleted successfully." };
  }),
});
