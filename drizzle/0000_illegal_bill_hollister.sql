CREATE TABLE `email_user` (
	`email` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`is_verified` integer,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `github_user` (
	`github_id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `google_user` (
	`google_id` text DEFAULT '',
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` text PRIMARY KEY DEFAULT '583da29e-a912-459e-bbd2-f7e7e3cdf43f' NOT NULL,
	`slug` text,
	`title` text NOT NULL,
	`cover_image` text NOT NULL,
	`blog` text NOT NULL,
	`creator_id` text,
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
	`id` text PRIMARY KEY DEFAULT '831d6779-4f80-473e-bf8d-97f8584d383f' NOT NULL,
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
	`time_stamp` text DEFAULT (current_timestamp) NOT NULL,
	`profile_pic` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` text PRIMARY KEY DEFAULT '660aa397-b29a-43bb-a12a-7c1013e2d0fe' NOT NULL,
	`verification_code` text NOT NULL,
	`user_id` text,
	`purpose` text NOT NULL,
	`expire_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `google_user_google_id_unique` ON `google_user` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);