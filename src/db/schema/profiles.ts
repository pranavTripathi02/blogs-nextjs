import { relations, sql } from "drizzle-orm";
import { timestamp, pgTable, text, varchar, serial } from "drizzle-orm/pg-core";
import { users } from "./nextAuth";
import { comments, blogs, profileLikedBlogs, profileBookmarkedBlogs } from ".";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  username: varchar("username", { length: 64 }).unique().notNull(),
  about: varchar("about", { length: 250 }),
  phone: varchar("phone", { length: 10 }),
  twitter: text("twitter").unique(),
  discord: text("discord").unique(),
  facebook: text("facebook").unique(),
  github: text("github").unique(),
  createdAt: timestamp("created_at", { mode: "date" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  comments: many(comments),
  authoredBlogs: many(blogs, { relationName: "blogAuthor" }),
  bookmarkedBlogs: many(profileBookmarkedBlogs),
  likedBlogs: many(profileLikedBlogs),
}));

export type TProfile = typeof profiles.$inferSelect;
