import { db } from "@/lib/db";
import { blogTable, bookmarkTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import Markdown from "@/components/protected/MarkDown";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import BlogPageActions from "@/components/protected/BlogPageActions";
import { validateRequest } from "@/lib/auth/verifyAccount";
import CommentSection from "@/components/protected/CommentSection";
import BlogPageCreatorActions from "@/components/protected/BlogPageCreatorActions";
interface BlogPageProps {
  params: {
    slug: string;
  };
}
const getBlog = cache(async (slug: string) => {
  const blog = (
    await db.select().from(blogTable).where(eq(blogTable.slug, slug))
  )[0];
  const verifySessionResult = await validateRequest();
  if (!blog) notFound();
  if (!verifySessionResult.user) redirect("/auth/login");
  const isBookmarked =
    (
      await db
        .select()
        .from(bookmarkTable)
        .where(
          and(
            eq(bookmarkTable.blogId, blog.id),
            eq(bookmarkTable.userId, verifySessionResult.user.id)
          )
        )
    ).length !== 0;
  return { blog, isBookmarked, user_id: verifySessionResult.user.id };
});

const BlogPage = async ({ params: { slug } }: BlogPageProps) => {
  const { blog, isBookmarked, user_id } = await getBlog(slug);
  return (
    <div className="w-[96%] md:w-[70%] lg:w-[45%] m-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl tracking-tight font-bold text-center mb-3">
        {blog.title}
      </h1>
      <Image
        src={blog.coverImageUrL}
        alt="Blog cover Image"
        height={470}
        width={470}
        className="size-[100%] mx-auto my-6"
      />
      {blog.blog && <Markdown>{blog.blog}</Markdown>}
      <section>
        <div className="divider my-0"></div>
        <div className="flex justify-between items-center w-full gap-3">
          <BlogPageActions blog_id={blog.id} isBookmarked={isBookmarked} />
          {user_id === blog.creatorId && (
            <BlogPageCreatorActions slug={blog.slug} />
          )}
        </div>
        <div className="divider my-0"></div>
      </section>
      <CommentSection blog_id={blog.id} user_id={user_id} slug={slug} />
    </div>
  );
};

export default BlogPage;
