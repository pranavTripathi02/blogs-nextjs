import * as blogsSchema from "./schema/blogs";
import * as commentsSchema from "./schema/comments";
import * as tagsSchema from "./schema/tags";
import * as profilesSchema from "./schema/profiles";
import * as blogTagsSchema from "./schema/blogTags";
import * as profileLikedBlogsSchema from "./schema/profileLikedBlogs";
import * as profileBookmarkedBlogsSchema from "./schema/profileBookmarkedBlogs";
import * as profileLikedCommentsSchema from "./schema/profileLikedComments";
import * as nextAuthSchema from "./schema/nextAuth";
//
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};
export const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema: {
    ...blogsSchema,
    ...commentsSchema,
    ...tagsSchema,
    ...profilesSchema,
    ...blogTagsSchema,
    ...profileLikedBlogsSchema,
    ...profileBookmarkedBlogsSchema,
    ...profileLikedCommentsSchema,
    ...nextAuthSchema,
  },
});
