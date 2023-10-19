import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const toDoRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.todo.create({
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          userId: 1,
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
  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany();
  }),
  getTodoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      console.log("input", input);
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
  deleteAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.deleteMany();
  }),
});
