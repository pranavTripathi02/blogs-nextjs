import { commentsRouter } from "~/server/api/routers/comments";
import { blogsRouter } from "~/server/api/routers/blogs";
import { usersRouter } from "~/server/api/routers/users";
import { createTRPCRouter } from "~/server/api/trpc";
import profilesRouter from "./routers/profiles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  blogs: blogsRouter,
  comments: commentsRouter,
  profiles: profilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
