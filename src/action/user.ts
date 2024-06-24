"use server";

import { validateRequest } from "@/lib/auth/verifyAccount";
import { blogTable, bookmarkTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const getBlogs = async ({
  offset,
  type = "",
}: {
  offset: number;
  type: string;
}) => {
  try {
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || !validateSessionResult.user) {
      return { error: "You are not authorized" };
    }
    let blogs;
    if (type === "created") {
      blogs = await db
        .select({
          slug: blogTable.slug,
          coverImage: blogTable.coverImageUrL,
          title: blogTable.title,
        })
        .from(blogTable)
        .offset(offset)
        .limit(6)
        .where(eq(blogTable.creatorId, validateSessionResult.user.id));
    } else if (type === "bookmarks") {
      blogs = await db
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
    } else {
      blogs = await db
        .select({
          slug: blogTable.slug,
          coverImage: blogTable.coverImageUrL,
          title: blogTable.title,
        })
        .from(blogTable);
    }
    return { blogs };
  } catch (error) {
    console.log(error);
    return { error: "Some server side error taken place while fetching blogs" };
  }
};
