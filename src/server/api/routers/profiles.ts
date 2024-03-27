import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { profiles } from "~/db/schema/";
import { TRPCError } from "@trpc/server";

const profilesRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ username: z.string() }).required())
    .query(async ({ ctx, input }) => {
      const { username } = input;
      const userFound = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.username, username),
        columns: {
          updatedAt: false,
        },
        with: {
          comments: true,
          likedBlogs: true,
          authoredBlogs: true,
          user: {
            columns: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });
      if (!userFound) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "invalid username: cannot find requested user",
        });
      }
      return userFound;
    }),
});

export default profilesRouter;
