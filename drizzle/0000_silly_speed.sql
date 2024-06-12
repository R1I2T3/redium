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
	`id` text PRIMARY KEY DEFAULT '5bc425dd-e255-4e86-9478-23d94e943a2f' NOT NULL,
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
	`id` text PRIMARY KEY DEFAULT 'b0424f24-d414-46bf-809c-60ddbc0c10b5' NOT NULL,
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
	`time_stamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` text PRIMARY KEY DEFAULT '39931813-423b-46fc-abc5-0690e9cb37ba' NOT NULL,
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