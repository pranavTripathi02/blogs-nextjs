import { pgTable, integer, unique } from "drizzle-orm/pg-core";
import { profiles, comments } from ".";
import { relations } from "drizzle-orm";

export const profileLikedComments = pgTable(
  "profile_liked_comments",
  {
    id: integer("id").primaryKey(),
    profileId: integer("profile_id")
      .references(() => profiles.id)
      .notNull(),
    commentId: integer("comment_id")
      .references(() => comments.id)
      .notNull(),
  },
  (t) => {
    return {
      profileLikedCommentsProfileIdCommentId: unique(
        "profile_liked_comments_profile_id_comment_id",
      ).on(t.profileId, t.commentId),
    };
  },
);

export const profileLikedCommentsRelation = relations(
  profileLikedComments,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profileLikedComments.profileId],
      references: [profiles.id],
    }),
    comment: one(comments, {
      fields: [profileLikedComments.commentId],
      references: [comments.id],
    }),
  }),
);

export type TBlogTags = typeof profileLikedComments.$inferSelect;
