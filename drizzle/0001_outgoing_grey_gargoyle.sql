CREATE TABLE `accommodation` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`street` text,
	`city` text,
	`zipcode` text,
	`beds` integer NOT NULL,
	`baths` integer NOT NULL,
	`price` integer NOT NULL,
	`is_featured` integer DEFAULT false,
	`is_active` integer DEFAULT true,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
