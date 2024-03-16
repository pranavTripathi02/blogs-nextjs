import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .references(() => profiles.id, {
      onDelete: "set null",
    })
    .notNull(),
  content: text("content", { length: 250 }).notNull(),
  likes: integer("likes").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  blog: one(blogs, {
    fields: [comments.blogId],
    references: [blogs.id],
    relationName: "blogComments",
  }),
  commenter: one(profiles, {
    fields: [comments.authorId],
    references: [profiles.id],
    relationName: "author",
  }),
  likedBy: many(profiles, { relationName: "likedComments" }),
}));

export type TComment = typeof comments.$inferSelect;
