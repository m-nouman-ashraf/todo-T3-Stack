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

  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany();
  }),
});
