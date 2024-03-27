import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/db/schema/nextAuth";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        password: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { password, name, email } = input;
      const userExists = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered.",
        });
      }
      try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userCreated = await ctx.db.insert(users).values({
          id: randomUUID(),
          name,
          email,
          password: passwordHash,
          createdAt: new Date(),
        });

        return userCreated;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
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
      if (!userFound.password) {
        return null;
      }
      // password verify
      const isPasswordMatch = await bcrypt.compare(
        password,
        userFound.password,
      );

      if (!isPasswordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Password does not match",
        });
      }

      const returnUser = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        image: userFound.image,
      };
      return returnUser;
    }),
  // refreshToken
});
