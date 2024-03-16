import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { comments } from "./comments";
import { blogs } from "./blogs";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  username: text("username", { length: 16 }).unique().notNull(),
  userMail: text("user_email"),
  imageUrl: text("image_url"),
  about: text("about", { length: 250 }),
  phone: text("phone", { length: 10 }),
  twitter: text("twitter").unique(),
  discord: text("discord").unique(),
  facebook: text("facebook").unique(),
  github: text("github").unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  comments: many(comments, { relationName: "author" }),
  userMail: one(users, {
    fields: [profiles.userMail],
    references: [users.email],
  }),
  authoredBlogs: many(blogs, { relationName: "author" }),
  bookmarks: many(blogs, { relationName: "bookmarkedBlogs" }),
  likedBlogs: many(blogs, { relationName: "likedBlogs" }),
  likedComments: many(comments, { relationName: "likedComments" }),
}));

export type TProfile = typeof profiles.$inferSelect;
