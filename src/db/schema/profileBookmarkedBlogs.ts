import { pgTable, integer, unique, serial } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";

export const profileBookmarkedBlogs = pgTable(
  "profile_bookmarked_blogs",
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
        "profile_bookmarked_blogs_profile_id_blog_id",
      ).on(t.profileId, t.blogId),
    };
  },
);

export const profileBookmarkedBlogsRelation = relations(
  profileBookmarkedBlogs,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profileBookmarkedBlogs.profileId],
      references: [profiles.id],
    }),
    blog: one(blogs, {
      fields: [profileBookmarkedBlogs.blogId],
      references: [blogs.id],
    }),
  }),
);

export type TBlogTags = typeof profileBookmarkedBlogs.$inferSelect;
