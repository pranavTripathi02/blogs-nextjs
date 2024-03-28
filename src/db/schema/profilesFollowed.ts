import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import { profiles } from ".";
import { relations } from "drizzle-orm";

export const profilesFollowed = pgTable(
  "profiles_followed",
  {
    id: serial("id").primaryKey(),
    followerId: integer("follower_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    followeeId: integer("followee_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
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
