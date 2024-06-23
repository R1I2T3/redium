"use server";

import { validateRequest } from "@/lib/auth/verifyAccount";
import { blogTable, bookmarkTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const getUserCreatedBlogs = async ({ offset }: { offset: number }) => {
  try {
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || !validateSessionResult.user) {
      return { error: "You are not authorized" };
    }
    const myBlogs = await db
      .select({
        slug: blogTable.slug,
        coverImage: blogTable.coverImageUrL,
        title: blogTable.title,
      })
      .from(blogTable)
      .offset(offset)
      .limit(6)
      .where(eq(blogTable.creatorId, validateSessionResult.user.id));
    return { data: myBlogs };
  } catch (error) {
    console.log(error);
    return { error: "Some server side error taken place while fetching blogs" };
  }
};

export const getUserBookMarkedBlogs = async ({
  offset,
}: {
  offset: number;
}) => {
  try {
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || !validateSessionResult.user) {
      return { error: "You are not authorized" };
    }
    const myBooksMarks = await db
      .select({
        title: blogTable.title,
        coverImage: blogTable.coverImageUrL,
        slug: blogTable.slug,
      })
      .from(bookmarkTable)
      .innerJoin(blogTable, eq(bookmarkTable.blogId, blogTable.id))
      .where(eq(bookmarkTable.userId, validateSessionResult.user.id))
      .offset(offset)
      .limit(6);
    return myBooksMarks;
  } catch (error) {
    console.log(error);
    return { error: "Some server side error taken place while fetching blogs" };
  }
};
