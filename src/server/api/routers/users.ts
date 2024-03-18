import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/db/schema/users";
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
        .values({ email, password });
      return userCreated;
    }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const userFound = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
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
  // refreshToken
});
