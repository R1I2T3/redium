import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  created_at: text("time_stamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const EmailPasswordTable = sqliteTable("email_user", {
  email: text("email").primaryKey(),
  password: text("password").notNull(),
  isVerified: integer("is_verified", { mode: "boolean" }),
  userId: text("userId").references(() => userTable.id),
});

export const GithubUserTable = sqliteTable("github_user", {
  github_id: text("github_id").primaryKey(),
  userId: text("user_id").references(() => userTable.id),
});

export const GoogleUserTable = sqliteTable("google_user", {
  google_id: text("google_id").unique().default(""),
  userId: text("user_id").references(() => userTable.id),
});

export const verificationTable = sqliteTable("verification_codes", {
  id: text("id").primaryKey().default(uuid()),
  verificationCode: text("verification_code").notNull(),
  userId: text("user_id").references(() => userTable.id),
  expiry: text("expire_at").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const blogTable = sqliteTable("blogs", {
  id: text("id").primaryKey().default(uuid()),
  slug: text("slug").unique(),
  title: text("title").notNull(),
  coverImageUrL: text("cover_image").notNull(),
  blog: text("blog").notNull(),
  creatorId: text("creator_id").references(() => userTable.id),
  password: text("password").default(""),
  created_at: text("time_stamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const bookmarkTable = sqliteTable(
  "bookmarks",
  {
    userId: text("userId").references(() => userTable.id),
    blogId: text("blog_id").references(() => blogTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.blogId] }),
    };
  }
);

export const commentTable = sqliteTable("comments", {
  id: text("id").primaryKey().default(uuid()),
  comment: text("comment").notNull(),
  userId: text("user_id").references(() => userTable.id),
  blogId: text("blog_id").references(() => blogTable.id),
});
