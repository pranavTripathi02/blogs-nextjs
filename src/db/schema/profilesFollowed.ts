import { integer, pgTable, unique } from "drizzle-orm/pg-core";
import { profiles } from ".";
import { relations } from "drizzle-orm";

export const profilesFollowed = pgTable(
  "profiles_followed",
  {
    id: integer("id").primaryKey(),
    followerId: integer("follower_id").references(() => profiles.id),
    followeeId: integer("followee_id").references(() => profiles.id),
  },
  (t) => ({
    profilesFollowedPidPid: unique("follower_id_followee_id").on(
      t.followerId,
      t.followeeId,
    ),
  }),
);

export const profilesFollowedRelation = relations(
  profilesFollowed,
  ({ one }) => ({
    followerId: one(profiles, {
      fields: [profilesFollowed.followerId],
      references: [profiles.id],
    }),
    followeeId: one(profiles, {
      fields: [profilesFollowed.followeeId],
      references: [profiles.id],
    }),
  }),
);

export type TProfilesFollowed = typeof profilesFollowed.$inferSelect;
