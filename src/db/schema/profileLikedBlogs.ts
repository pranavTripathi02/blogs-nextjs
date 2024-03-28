import { pgTable, integer, unique, serial } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";

export const profileLikedBlogs = pgTable(
  "profile_liked_blogs",
  {
    id: serial("id").primaryKey(),
    profileId: integer("profile_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    blogId: integer("blog_id")
      .references(() => blogs.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      profileLikedBlogsProfileIdBlogId: unique(
        "profile_liked_blogs_profile_id_blog_id",
      ).on(t.profileId, t.blogId),
    };
  },
);

export const profileLikedBlogsRelation = relations(
  profileLikedBlogs,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profileLikedBlogs.profileId],
      references: [profiles.id],
    }),
    blog: one(blogs, {
      fields: [profileLikedBlogs.blogId],
      references: [blogs.id],
    }),
  }),
);

export type TBlogTags = typeof profileLikedBlogs.$inferSelect;
