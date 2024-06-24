import {
  pgTable,
  text,
  timestamp,
  boolean,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { InferSelectModel, sql } from "drizzle-orm";

export const userTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const EmailPasswordTable = pgTable("email_user", {
  email: text("email").primaryKey(),
  password: text("password").notNull(),
  isVerified: boolean("is_verified"),
  userId: text("userId").references(() => userTable.id),
});

export const GithubUserTable = pgTable("github_user", {
  github_id: text("github_id").primaryKey(),
  userId: text("user_id").references(() => userTable.id),
});

export const GoogleUserTable = pgTable("google_user", {
  google_id: text("google_id").unique().default(""),
  userId: text("user_id").references(() => userTable.id),
});

export const verificationTable = pgTable("verification_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  verificationCode: text("verification_code").notNull(),
  userId: text("user_id").references(() => userTable.id),
  purpose: text("purpose").notNull(),
  expiry: text("expire_at").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const blogTable = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique(),
  title: text("title").notNull(),
  coverImageUrL: text("cover_image").notNull(),
  blog: text("blog").notNull(),
  creatorId: text("creator_id").references(() => userTable.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const bookmarkTable = pgTable(
  "bookmarks",
  {
    userId: text("userId").references(() => userTable.id),
    blogId: uuid("blog_id").references(() => blogTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.blogId] }),
    };
  }
);

export const commentTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  comment: text("comment").notNull(),
  userId: text("user_id").references(() => userTable.id),
  blogId: uuid("blog_id").references(() => blogTable.id),
});

export type CommentSelectType = InferSelectModel<typeof commentTable>;
