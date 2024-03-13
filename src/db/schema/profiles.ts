import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey(),
  about: text("about"),
  twitter: text("twitter").unique(),
  discord: text("discord").unique(),
  facebook: text("facebook").unique(),
  github: text("github").unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users),
}));

export type TProfile = typeof profiles.$inferSelect;
