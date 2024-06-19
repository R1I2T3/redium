"use server";
import { validateRequest } from "@/lib/auth/verifyAccount";
import { db } from "@/lib/db";
import { blogTable, commentTable, bookmarkTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createCommentAction = async (comment: string, blog_id: string) => {
  if (typeof comment !== "string") {
    return { error: "Invalid data provided" };
  }
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const isBlogPresent = (
    await db.select().from(blogTable).where(eq(blogTable.id, blog_id))
  )[0];
  if (!isBlogPresent) {
    return { error: "This comment can't be added because blog is not present" };
  }
  await db.insert(commentTable).values({
    comment,
    userId: validateSessionResult.user.id,
    blogId: blog_id,
  });
  revalidatePath("/(protected)/blog/[slug]", "page");
};

export const addToBookMarkAction = async (blog_id: string) => {
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const isBlogPresent = (
    await db.select().from(blogTable).where(eq(blogTable.id, blog_id))
  )[0];
  if (!isBlogPresent) {
    return { error: "This comment can't be added because blog is not present" };
  }
  await db
    .insert(bookmarkTable)
    .values({ userId: validateSessionResult.user.id, blogId: blog_id });
  revalidatePath("/(protected)/blog/[slug]", "page");
};

export const removeFromBookMarkAction = async (blog_id: string) => {
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const isBlogPresent = (
    await db.select().from(blogTable).where(eq(blogTable.id, blog_id))
  )[0];
  if (!isBlogPresent) {
    return { error: "Bookmark can't be removed" };
  }
  await db
    .delete(bookmarkTable)
    .where(
      and(
        eq(bookmarkTable.blogId, blog_id),
        eq(bookmarkTable.userId, validateSessionResult.user.id)
      )
    );
  revalidatePath("/(protected)/blog/[slug]", "page");
};
