"use server";

import { env } from "@/env";
import { validateRequest } from "@/lib/auth/verifyAccount";
import { db } from "@/lib/db";
import { blogTable } from "@/lib/db/schema";
import { CreateBlogSchema } from "@/lib/schema.ts";
import { createSlug } from "@/utils";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});
export const createBlogAction = async (data: FormData) => {
  try {
    const dataEntries = Object.fromEntries(data.entries());
    const parsedData = CreateBlogSchema.parse(dataEntries);
    const validateSessionResult = await validateRequest();
    if (!validateSessionResult || validateSessionResult.user === null) {
      return { error: "Unauthorized action" };
    }
    const slug = createSlug(parsedData.title);
    const arrayBuffer = await parsedData.coverImage.arrayBuffer();
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
    await db.insert(blogTable).values({
      title: parsedData.title as string,
      slug: slug as string,
      coverImageUrL,
      blog: parsedData.blog,
      creatorId: validateSessionResult.user.id!,
    });
    return { success: true };
  } catch (error) {
    return { error: "some server side error taken place" };
  }
};
