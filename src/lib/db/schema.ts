import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  email: text("email").unique().default(""),
  gmail_id: text("gmail_id").unique().default(""),
  password: text("password").default(""),
  created_at: text("time_stamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const blogTable = sqliteTable("blogs", {
  id: text("id").primaryKey(),
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
  id: text("id").primaryKey(),
  comment: text("comment").notNull(),
  userId: text("user_id").references(() => userTable.id),
  blogId: text("blog_id").references(() => blogTable.id),
});
