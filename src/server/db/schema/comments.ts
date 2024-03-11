import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  parentComment: integer("parent_comment"),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  text: text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  parentComment: one(comments),
  blog: one(blogs, { fields: [comments.blogId], references: [blogs.id] }),
}));

export type TComment = typeof comments.$inferSelect;
