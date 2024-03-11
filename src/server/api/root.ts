import { commentsRouter } from "~/server/api/routers/comments";
import { blogsRouter } from "~/server/api/routers/blogs";
import { usersRouter } from "~/server/api/routers/users";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  blogs: blogsRouter,
  comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
