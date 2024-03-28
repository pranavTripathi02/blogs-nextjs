import {
  pgTable,
  integer,
  varchar,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  authorId: integer("author_id")
    .references(() => profiles.id, {
      onDelete: "cascade",
    })
    .notNull(),
  content: varchar("content", { length: 250 }).notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at", { mode: "date" }),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  blog: one(blogs, {
    fields: [comments.blogId],
    references: [blogs.id],
    relationName: "blogComments",
  }),
  commenter: one(profiles, {
    fields: [comments.authorId],
    references: [profiles.id],
  }),
}));

export type TComment = typeof comments.$inferSelect;
