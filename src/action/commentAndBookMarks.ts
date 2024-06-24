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
  const newComment = (
    await db
      .insert(commentTable)
      .values({
        comment,
        userId: validateSessionResult.user.id,
        blogId: blog_id,
      })
      .returning({
        id: commentTable.id,
        blogId: commentTable.blogId,
        userId: commentTable.userId,
        comment: commentTable.comment,
      })
  )[0];
  return { newComment };
};

export const getComments = async (skip: number, blog_id: string) => {
  try {
    const comments = await db
      .select()
      .from(commentTable)
      .limit(5)
      .offset(skip * 5)
      .where(eq(commentTable.blogId, blog_id));
    console.log(comments);

    return comments;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};

export const deleteCommentAction = async (comment_id: string) => {
  try {
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || validateSessionResult.user === null) {
      return { error: "Unauthorized action" };
    }
    const comment = (
      await db
        .select()
        .from(commentTable)
        .where(eq(commentTable.id, comment_id))
    )[0];
    if (!comment) {
      return { error: "Invalid comment id provided" };
    }
    if (validateSessionResult.user.id !== comment.userId) {
      return { error: "You are not authorize to perform this action" };
    }
    await db.delete(commentTable).where(eq(commentTable.id, comment_id));
    return { success: "Comment deleted successfully" };
  } catch (error) {
    return { error: "some server side error taken place" };
  }
};

export const updateCommentAction = async (
  newComment: string,
  comment_id: string
) => {
  try {
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || validateSessionResult.user === null) {
      return { error: "Unauthorized action" };
    }
    const comment = (
      await db
        .select()
        .from(commentTable)
        .where(eq(commentTable.id, comment_id))
    )[0];
    if (!comment) {
      return { error: "Invalid comment id provided" };
    }
    if (validateSessionResult.user.id !== comment.userId) {
      return { error: "You are not authorize to perform this action" };
    }
    const updateComment = (
      await db
        .update(commentTable)
        .set({ comment: newComment })
        .where(eq(commentTable.id, comment_id))
        .returning({ id: commentTable.id, comment: commentTable.comment })
    )[0];
    return { updateComment: updateComment };
  } catch (error) {
    return { error: "some server side error taken place" };
  }
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
