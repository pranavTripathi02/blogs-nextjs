import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "~/env";
import * as blogsSchema from "./schema/blogs";
import * as commentsSchema from "./schema/comments";
import * as tagsSchema from "./schema/tags";
import * as profilesSchema from "./schema/profiles";
import * as blogTagsSchema from "./schema/blogTags";
import * as profileLikedBlogsSchema from "./schema/profileLikedBlogs";
import * as profileBookmarkedBlogsSchema from "./schema/profileBookmarkedBlogs";
import * as profileLikedCommentsSchema from "./schema/profileLikedComments";
import * as nextAuthSchema from "./schema/nextAuth";

// import { Database as cloudDB } from "@sqlitecloud/drivers";
//
// const database = new cloudDB(env.DATABASE_URL);

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// const globalForDb = globalThis as unknown as {
//   conn: Database.Database | undefined;
// };

export const conn = new Database(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

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
