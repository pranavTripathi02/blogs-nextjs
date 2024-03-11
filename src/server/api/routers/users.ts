import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema/users";
// import { posts } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { username, password, name, email } = input;
      const userCreated = await ctx.db
        .insert(users)
        .values({ email, name, password, username });
      return userCreated;
      // return {
      //   comment: `${input.text}`,
      // };
    }),
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input;
      const userFound = await ctx.db.query.users.findFirst({
        where: eq(users.username, username),
      });
      if (!userFound) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No users found with this username. Please try again.",
        });
      }
      // password verify
      return userFound;
    }),
});
