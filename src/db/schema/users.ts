import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { relations, sql } from "drizzle-orm";
import { comments } from "./comments";
import { profiles } from "./profiles";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  phone: text("phone", { length: 10 }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// nullable
export const usersRelations = relations(users, ({ one, many }) => ({
  blogs: many(blogs),
  comments: many(comments),
  profile: one(profiles),
  bookmarks: many(blogs),
}));

export type TUser = typeof users.$inferSelect;
