import {
  integer,
  pgTable,
  varchar,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profiles, blogTags } from ".";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 20 }).notNull().unique(),
  createdBy: integer("profile_id").references(() => profiles.id, {
    onDelete: "no action",
  }),
  createdAt: timestamp("created_at", { mode: "date" }),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  blogTags: many(blogTags),
}));

export type TTag = typeof tags.$inferSelect;
