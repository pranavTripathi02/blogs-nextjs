import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "~/env";
import * as usersSchema from "./schema/users";
import * as blogsSchema from "./schema/blogs";
import * as commentsSchema from "./schema/comments";
import * as tagsSchema from "./schema/tags";
import * as profilesSchema from "./schema/profiles";
import * as blogTagsSchema from "./schema/blogTags";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Database.Database | undefined;
};

export const conn =
  globalForDb.conn ?? new Database(env.DATABASE_URL, { fileMustExist: false });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema: {
    ...usersSchema,
    ...blogsSchema,
    ...commentsSchema,
    ...tagsSchema,
    ...profilesSchema,
    ...blogTagsSchema,
  },
});
