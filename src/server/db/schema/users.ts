import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { relations, sql } from "drizzle-orm";
import { comments } from "./comments";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  phone: text("phone", { length: 10 }),
  // userTwitter: text("user_twitter").unique(),
  // userDiscord: text("user_discord").unique(),
  // userFacebook: text("user_facebook").unique(),
  // userGithub: text("user_github").unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// nullable
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  comments: many(comments),
}));
