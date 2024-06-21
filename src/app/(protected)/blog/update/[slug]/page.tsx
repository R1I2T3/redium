import UpdateBlogForm from "@/components/protected/UpdateBlogForm";
import { db } from "@/lib/db";
import { blogTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";

interface UpdateBlogPageProps {
  params: {
    slug: string;
  };
}

const UpdateBlogPage = async ({ params: { slug } }: UpdateBlogPageProps) => {
  const blog = (
    await db.select().from(blogTable).where(eq(blogTable.slug, slug))
  )[0];
  if (!blog) return notFound();
  return (
    <div className="w-[95%] md:w-[70%] lg:w-[50%] m-auto pt-4">
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider mb-4">
        Update Blog
      </h1>
      <div className="card w-[full] shadow-xl border rounded-xl">
        <UpdateBlogForm
          blog_title={blog.title}
          blog_body={blog.blog}
          blog_id={blog.id}
        />
      </div>
    </div>
  );
};

export default UpdateBlogPage;
