import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { comments } from "./comments";
import { profiles } from "./profiles";
import { blogTags } from "./blogTags";
import { profileBookmarkedBlogs, profileLikedBlogs } from ".";

export const blogs = pgTable("blogs", {
  id: integer("id").primaryKey(),
  authorId: integer("author_id")
    .references(() => profiles.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  desc: text("desc"),
  imageUrl: text("image_url"),
  views: integer("views").default(1),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  bookmarks: integer("bookmarks").default(0),
  createdAt: timestamp("created_at", { mode: "date" }),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  author: one(profiles, {
    fields: [blogs.authorId],
    references: [profiles.id],
    relationName: "blogAuthor",
  }),
  comments: many(comments, { relationName: "blogComments" }),
  bookmarkedBy: many(profileBookmarkedBlogs),
  likedBy: many(profileLikedBlogs),
  blogTags: many(blogTags),
}));

export type TBlog = typeof blogs.$inferSelect;
