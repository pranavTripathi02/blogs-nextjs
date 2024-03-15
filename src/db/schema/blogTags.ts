import { integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";
import { blogs } from "./blogs";
import { tags } from "./tags";
import { relations } from "drizzle-orm";

export const blogTags = sqliteTable(
  "blog_tags",
  {
    id: integer("id").primaryKey(),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogs.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
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
