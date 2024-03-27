// import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { comments, profiles } from "~/db/schema";
import { profileLikedComments } from "~/db/schema/profileLikedComments";
// import { blogs } from "~/db/schema/blogs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
// import { posts } from "~/server/db/schema";

export const commentsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        comment: `${input.text}`,
      };
    }),
  likeComment: protectedProcedure
    .input(z.object({ commentId: z.number(), profileId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { commentId, profileId } = input;
      const commentExists = await ctx.db.query.comments.findFirst({
        where: eq(comments.id, commentId),
      });
      const profileExists = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.id, profileId),
      });
      if (!commentExists || !profileExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid comment and profile combination.",
        });
      }
      const isAlreadyLiked = await ctx.db.query.profileLikedComments.findFirst({
        where:
          (eq(profileLikedComments.profileId, profileId),
          eq(profileLikedComments.commentId, commentId)),
      });
      if (isAlreadyLiked) {
        await ctx.db
          .delete(profileLikedComments)
          .where(
            (eq(profileLikedComments.profileId, profileId),
            eq(profileLikedComments.commentId, commentId)),
          );
        await ctx.db
          .update(comments)
          .set({ likes: sql`${comments.likes}-1` })
          .where(eq(comments.id, commentId));
      } else {
        await ctx.db
          .insert(profileLikedComments)
          .values({ profileId, commentId });

        await ctx.db
          .update(comments)
          .set({ likes: sql`${comments.likes}+1` })
          .where(eq(comments.id, commentId));
      }
      return commentExists.likes;
    }),
});
