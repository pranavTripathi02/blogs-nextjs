import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { blogs } from "~/server/db/schema/blogs";

export const blogsRouter = createTRPCRouter({
  getBlogs: publicProcedure
    .input(z.object({ blogsOffset: z.number() }).optional())
    .query(async ({ input, ctx }) => {
      // if(input?.blogsOffset)
      //   const { blogsOffset } = input;
      const blogsList = await ctx.db.query.blogs.findMany({
        limit: 5,
        offset: input?.blogsOffset ?? 0,
        orderBy: [desc(blogs.createdAt)],
        columns: {
          content: false,
        },
        with: {
          author: {
            columns: {
              name: true,
            },
          },
          comments: true,
        },
      });
      return blogsList;
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
