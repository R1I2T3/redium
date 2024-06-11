CREATE TABLE `blogs` (
	`id` text PRIMARY KEY DEFAULT 'ba09ecb7-c715-4a24-895a-89e6b80184d3' NOT NULL,
	`slug` text,
	`title` text NOT NULL,
	`cover_image` text NOT NULL,
	`blog` text NOT NULL,
	`creator_id` text,
	`password` text DEFAULT '',
	`time_stamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bookmarks` (
	`userId` text,
	`blog_id` text,
	PRIMARY KEY(`blog_id`, `userId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY DEFAULT 'dad8aa28-63d5-4742-871b-11c6484c9391' NOT NULL,
	`comment` text NOT NULL,
	`user_id` text,
	`blog_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`email` text DEFAULT '',
	`github_id` text DEFAULT '',
	`google_id` text DEFAULT '',
	`password` text DEFAULT '',
	`is_verified` integer,
	`time_stamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` text PRIMARY KEY DEFAULT '190a22bd-1264-459d-834a-97144b18f18e' NOT NULL,
	`verification_code` text NOT NULL,
	`user_id` text,
	`expire_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_google_id_unique` ON `users` (`google_id`);