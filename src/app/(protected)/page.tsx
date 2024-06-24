import { getBlogs } from "@/action/user";
import BlogCard from "@/components/protected/BlogCard";
import { notFound } from "next/navigation";
import React from "react";

const HomePage = async () => {
  const data = await getBlogs({ offset: 0, type: "" });
  if (!data || data.error) return notFound();
  if (!data.blogs) return;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.blogs.map((blog) => (
        <BlogCard
          key={blog.slug}
          title={blog.title}
          slug={blog.slug}
          coverImage={blog.coverImage}
        />
      ))}
    </div>
  );
};

export default HomePage;
