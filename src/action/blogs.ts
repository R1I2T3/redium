"use server";

import { env } from "@/env";
import { validateRequest } from "@/lib/auth/verifyAccount";
import { db } from "@/lib/db";
import { blogTable, bookmarkTable, commentTable } from "@/lib/db/schema";
import { CreateBlogSchema, UpdateBlogSchema } from "@/lib/schema.ts";
import { createSlug } from "@/utils";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const createBlogAction = async (data: FormData) => {
  const dataEntries = Object.fromEntries(data.entries());
  const parsedData = CreateBlogSchema.safeParse(dataEntries);
  if (!parsedData.success) {
    return { error: "Invalid data provided" };
  }
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const { title, blog, coverImage } = parsedData.data;
  const slug = createSlug(title);
  const arrayBuffer = await coverImage.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const coverImageUrL = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.secure_url);
      })
      .end(buffer);
  });
  if (
    typeof title === "string" &&
    typeof blog === "string" &&
    typeof coverImageUrL === "string" &&
    validateSessionResult.user.id
  ) {
    await db.insert(blogTable).values({
      title,
      blog,
      coverImageUrL,
      slug,
      creatorId: validateSessionResult.user.id,
    });
  }

  return redirect("/");
};

export const deleteBlogAction = async (slug: string) => {
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const currentBlog = (
    await db.select().from(blogTable).where(eq(blogTable.slug, slug))
  )[0];
  if (!currentBlog) {
    return { error: "Following blog does not exists" };
  }
  if (currentBlog.creatorId !== validateSessionResult.user.id) {
    return {
      error: "You can't delete this blog because you didn't created it",
    };
  }
  await db.transaction(async (trx) => {
    await trx
      .delete(commentTable)
      .where(eq(commentTable.blogId, currentBlog.id));
    await trx
      .delete(bookmarkTable)
      .where(eq(bookmarkTable.blogId, currentBlog.id));
    await trx.delete(blogTable).where(eq(blogTable.slug, slug));
  });
  return { success: "Blog deleted successfully" };
};

export const updateBlogAction = async (data: FormData, blogId: string) => {
  const dataEntries = Object.fromEntries(data.entries());
  const parsedData = UpdateBlogSchema.parse(dataEntries);
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || validateSessionResult.user === null) {
    return { error: "Unauthorized action" };
  }
  const isCreator = (
    await db
      .select()
      .from(blogTable)
      .where(
        and(
          eq(blogTable.id, blogId),
          eq(blogTable.creatorId, validateSessionResult.user.id)
        )
      )
  )[0];
  if (!isCreator) {
    return { error: "This action can't be performed" };
  }
  let coverImageUrL: any = "";
  if (parsedData.coverImage) {
    const arrayBuffer = await parsedData.coverImage.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const c = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result?.secure_url);
        })
        .end(buffer);
    });
    coverImageUrL = c;
  }
  await db.update(blogTable).set({
    blog: parsedData.blog || isCreator.blog,
    title: parsedData.title || isCreator.title,
    coverImageUrL: coverImageUrL || isCreator.coverImageUrL,
  });
  return redirect(`/blog/${isCreator.slug}`);
};
