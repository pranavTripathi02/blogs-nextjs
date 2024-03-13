import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { blogToTags } from "./tags";
import { comments } from "./comments";

export const blogs = sqliteTable("blogs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  desc: text("desc"),
  imageUrl: text("image_url"),
  likes: integer("likes").default(0),
  views: integer("views").default(1),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  authorId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  author: one(users, { fields: [blogs.authorId], references: [users.id] }),
  comments: many(comments),
  blog_tags: many(blogToTags),
}));

export type TBlog = typeof blogs.$inferSelect;
