import { Chart } from "@/components/protected/Chart";
import { validateRequest } from "@/lib/auth/verifyAccount";
import { db } from "@/lib/db";
import { blogTable, bookmarkTable, commentTable } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { cache } from "react";

const chartData = cache(async () => {
  const validateSessionResult = await validateRequest();
  if (!validateSessionResult || !validateSessionResult.user) {
    return redirect("/auth/login");
  }
  const user_id = validateSessionResult.user.id;
  const comments = await db
    .select({
      name: count(),
      comments: count(commentTable),
      title: blogTable.title,
    })
    .from(blogTable)
    .innerJoin(commentTable, eq(commentTable.blogId, blogTable.id))
    .where(eq(blogTable.creatorId, user_id));
  const bookmarks = await db
    .select({
      bookmarks: count(bookmarkTable),
      name: count(),
      title: blogTable.title,
    })
    .from(blogTable)
    .innerJoin(bookmarkTable, eq(bookmarkTable.blogId, blogTable.id))
    .where(eq(blogTable.creatorId, user_id));
  return { comments, bookmarks };
});
const AnalyticsPage = async () => {
  const { comments, bookmarks } = await chartData();
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mt-10 mb-20">
        Analytics
      </h1>
      {comments.length === 0 && bookmarks.length === 0 ? (
        <h2 className="text-xl text-center font-extralight">
          There are no blogs created by yoy to show analytics
        </h2>
      ) : (
        <div className="flex flex-col lg:flex-row  justify-center items-center w-[100%] h-[70dvh] lg:h-[100%] space-y-10 lg:space-y-0 lg:space-x-10">
          {comments[0].comments !== 0 ? (
            <Chart data={comments} type="comments" />
          ) : (
            <h1>{"There are not comment to show"}</h1>
          )}
          {bookmarks[0].bookmarks !== 0 ? (
            <Chart data={bookmarks} type="bookmarks" />
          ) : (
            <h1>{"There are not bookmarks to show"}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
