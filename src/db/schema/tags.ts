import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";
import { blogTags } from "./blogTags";

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  tag: text("tag", { length: 20 }).notNull().unique(),
  createdBy: integer("profile_id").references(() => profiles.id, {
    onDelete: "no action",
  }),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  blogTags: many(blogTags),
}));

export type TTag = typeof tags.$inferSelect;
