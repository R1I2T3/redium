import { db } from "@/lib/db";
import {
  blogTable,
  bookmarkTable,
  commentTable,
  userTable,
} from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import Markdown from "@/components/protected/MarkDown";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import BlogPageActions from "@/components/protected/BlogPageActions";
import { validateRequest } from "@/lib/auth/verifyAccount";
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
  const comments = await db
    .select()
    .from(commentTable)
    .limit(4)
    .where(eq(commentTable.blogId, blog.id));
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
  return { blog, comments, isBookmarked };
});
const BlogPage = async ({ params: { slug } }: BlogPageProps) => {
  const { blog, comments, isBookmarked } = await getBlog(slug);
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
      <BlogPageActions blog_id={blog.id} isBookmarked={isBookmarked} />
      {comments.length !== 0 ? (
        comments.map((comment) => <p key={comment.id}>{comment.comment}</p>)
      ) : (
        <h1 className="text-center font-bold text-xl">
          There are no comments in this blog
        </h1>
      )}
    </div>
  );
};

export default BlogPage;
