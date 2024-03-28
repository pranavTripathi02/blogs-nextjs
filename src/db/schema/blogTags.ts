import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import { blogs } from "./blogs";
import { tags } from "./tags";
import { relations } from "drizzle-orm";

export const blogTags = pgTable(
  "blog_tags",
  {
    id: serial("id").primaryKey(),
    blogId: integer("blog_id")
      .references(() => blogs.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      blogTagsBlogIdTagId: unique("blog_tags_blog_id_tag_id").on(
        t.blogId,
        t.tagId,
      ),
    };
  },
);
export const blogsTagsRelation = relations(blogTags, ({ one }) => ({
  blog: one(blogs, {
    fields: [blogTags.blogId],
    references: [blogs.id],
  }),
  tag: one(tags, {
    fields: [blogTags.tagId],
    references: [tags.id],
  }),
}));

export type TBlogTags = typeof blogTags.$inferSelect;
