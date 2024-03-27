import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./nextAuth";
import { comments } from "./comments";
import { blogs } from "./blogs";
import { profileLikedBlogs } from "./profileLikedBlogs";
import { profileBookmarkedBlogs } from "./profileBookmarkedBlogs";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  about: text("about", { length: 250 }),
  phone: text("phone", { length: 10 }),
  twitter: text("twitter").unique(),
  discord: text("discord").unique(),
  facebook: text("facebook").unique(),
  github: text("github").unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  comments: many(comments, { relationName: "author" }),
  authoredBlogs: many(blogs, { relationName: "blogAuthor" }),
  bookmarkedBlogs: many(profileBookmarkedBlogs),
  likedBlogs: many(profileLikedBlogs),
  likedComments: many(comments, { relationName: "likedComments" }),
}));

export type TProfile = typeof profiles.$inferSelect;
