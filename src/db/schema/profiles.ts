import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./nextAuth";
import { comments, blogs, profileLikedBlogs, profileBookmarkedBlogs } from ".";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  username: text("username", { length: 16 }).unique().notNull(),
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

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  comments: many(comments),
  authoredBlogs: many(blogs, { relationName: "blogAuthor" }),
  bookmarkedBlogs: many(profileBookmarkedBlogs),
  likedBlogs: many(profileLikedBlogs),
}));

export type TProfile = typeof profiles.$inferSelect;
