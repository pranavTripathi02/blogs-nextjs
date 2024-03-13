import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { blogs } from "./blogs";

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  tag: text("tag", { length: 20 }).notNull().unique(),
  createdBy: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const blogToTags = sqliteTable("blogs_to_tags", {
  id: integer("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id),
});

export const tagsRelations = relations(tags, ({ one, many }) => ({
  tag_blogs: many(blogToTags),
  createdBy: one(users, { fields: [tags.createdBy], references: [users.id] }),
}));

export const blogsToTagsRelation = relations(blogToTags, ({ one }) => ({
  blog: one(blogs, {
    fields: [blogToTags.blogId],
    references: [blogs.id],
  }),
  tag: one(tags, {
    fields: [blogToTags.tagId],
    references: [tags.id],
  }),
}));

export type TTag = typeof tags.$inferSelect;
