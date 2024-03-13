CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY NOT NULL,
	`about` text,
	`twitter` text,
	`discord` text,
	`facebook` text,
	`github` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`tag` text(20) NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE blogs ADD `likes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE blogs ADD `views` integer DEFAULT 1;--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_twitter_unique` ON `profiles` (`twitter`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_discord_unique` ON `profiles` (`discord`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_facebook_unique` ON `profiles` (`facebook`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_github_unique` ON `profiles` (`github`);--> statement-breakpoint
ALTER TABLE `blogs` DROP COLUMN `tags`;