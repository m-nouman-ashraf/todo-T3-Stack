import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const toDoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.todo.create({
        data: {
          title: input.title,
          userId: 1,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
