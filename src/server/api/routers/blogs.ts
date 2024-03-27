import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { blogs } from "~/db/schema";
import { TRPCError } from "@trpc/server";
import { comments } from "~/db/schema";

const sortByValues = ["likes", "views", "createdAt"] as const;
const sortDir = ["asc", "desc"] as const;
// type sortType = Infer<typeof blogs>

export const blogsRouter = createTRPCRouter({
  getBlogs: publicProcedure
    .input(
      z.object({
        authorId: z.number().optional(),
        offset: z.number().optional().default(0),
        sortBy: z.enum(sortByValues).optional().default("createdAt"),
        sortDir: z.enum(sortDir).optional().default("desc"),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { authorId, sortDir, sortBy, offset } = input;
      const blogsList = await ctx.db.query.blogs.findMany({
        where: authorId ? eq(blogs.authorId, authorId) : undefined,
        limit: 5,
        offset,
        orderBy: [sortDir == "asc" ? asc(blogs[sortBy]) : desc(blogs[sortBy])],
        columns: {
          content: false,
        },
        with: {
          author: {
            with: {
              user: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          comments: true,
          blogTags: {
            columns: {
              id: false,
              blogId: false,
              tagId: false,
            },
            with: {
              tag: {
                columns: {
                  id: true,
                  tag: true,
                },
              },
            },
          },
        },
      });
      return blogsList;
    }),
  getBlogDetails: publicProcedure
    .input(z.object({ blogId: z.number() }).required())
    .query(async ({ input, ctx }) => {
      const { blogId } = input;
      const blog = await ctx.db.query.blogs.findFirst({
        where: eq(blogs.id, blogId),
        with: {
          comments: {
            orderBy: desc(comments.createdAt),
            with: {
              commenter: {
                columns: {
                  username: true,
                },
              },
            },
          },
          author: {
            with: {
              user: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
              authoredBlogs: {
                columns: {
                  id: true,
                  title: true,
                },
                with: {
                  blogTags: {
                    with: {
                      tag: {
                        columns: { tag: true, id: true },
                      },
                    },
                  },
                },
              },
            },
          },
          blogTags: {
            // columns: {
            //   id: false,
            //   blogId: false,
            //   tagId: false,
            // },
            with: {
              tag: {
                columns: {
                  id: true,
                  tag: true,
                },
              },
            },
          },
        },
        columns: {
          id: false,
        },
      });
      if (!blog) {
        throw new TRPCError({
          message: "Cannot find this blog",
          code: "NOT_FOUND",
        });
      }
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
