"use server";

import { env } from "@/env";
import { validateRequest } from "@/lib/auth/verifyAccount";
import { db } from "@/lib/db";
import { blogTable } from "@/lib/db/schema";
import { CreateBlogSchema } from "@/lib/schema.ts";
import { createSlug } from "@/utils";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";

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
