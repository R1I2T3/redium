"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import BlogCard from "./BlogCard";
import { useInView } from "react-intersection-observer";
import { getBlogs } from "@/action/user";
interface BlogPageSectionProps {
  initialData: any;
  q?: string;
  type?: string;
}
export interface Page {
  title: string;
  coverImage: string;
  slug: string;
}
[];
const BlogsSections = ({ initialData, q, type }: BlogPageSectionProps) => {
  const [pages, setPages] = useState<Page[]>([...initialData]);
  const [ref, inView] = useInView();
  const [pending, startTransition] = useTransition();
  const [page, setPage] = useState(0);
  const [canFetch, setCanFetch] = useState(true);
  useEffect(() => {
    if (!canFetch) return;
    if (inView) {
      const LoadMoreData = () => {
        startTransition(async () => {
          const next = page + 1;
          const { blogs } = await getBlogs({
            offset: next,
            type: type ? type : "",
            q: q ? q : "",
          });
          console.log(blogs);

          if (!blogs || blogs.length === 0 || blogs.length % 6 !== 0) {
            setCanFetch(false);
          }
          // @ts-ignore
          setPages((prev) => [...(prev?.length ? prev : []), ...blogs]);
          setPage((prev) => prev + 1);
        });
      };
      LoadMoreData();
    }
  }, [inView, q, page, canFetch, type]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%]">
        {pages.length !== 0
          ? pages.map((blog) => (
              <BlogCard
                key={blog.slug}
                title={blog.title}
                slug={blog.slug}
                coverImage={blog.coverImage}
              />
            ))
          : ""}
      </div>
      <div ref={ref}>
        {pending && <span className="loading loading-spinner m-auto"></span>}
      </div>
    </>
  );
};

export default BlogsSections;
