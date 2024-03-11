import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { blogs } from "~/server/db/schema/blogs";

export const blogsRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(({ ctx }) => {
    console.log("what");
    return ctx.db.query.blogs.findMany({
      orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
    });
  }),
  getBlogDetails: publicProcedure
    .input(z.object({ blogId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { blogId } = input;
      const blog = await ctx.db.query.blogs.findFirst({
        where: eq(blogs.id, blogId),
      });
      return blog;
    }),
  createBlog: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        imageUrl: z.string(),
        authorId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { authorId, imageUrl, title, content } = input;
      const blog = await ctx.db.insert(blogs).values({
        authorId,
        imageUrl,
        title,
        content,
      });
      return blog;
    }),
});
