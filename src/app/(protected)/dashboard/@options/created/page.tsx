import { getBlogs } from "@/action/user";
import BlogsSections from "@/components/protected/BlogsSections";
import { notFound } from "next/navigation";
import React from "react";
const CreateBlogPage = async () => {
  const data = await getBlogs({ offset: 0, type: "created", q: "" });
  if (data.error) return notFound();
  return (
    <div className="w-[100dvw] flex flex-col justify-center items-center mt-3">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        Your Created blogs
      </h1>
      <BlogsSections initialData={data.blogs} type="created" />
    </div>
  );
};

export default CreateBlogPage;
