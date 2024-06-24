import Image from "next/image";
import Link from "next/link";
import React from "react";

interface blogCardProps {
  slug: string | null;
  title: string | null;
  coverImage: string | null;
}
const BlogCard = ({ title, slug, coverImage }: blogCardProps) => {
  if (!title || !slug || !coverImage) return;
  return (
    <Link
      className="card flex flex-row md:flex-col-reverse w-[90%] items-center justify-between md:justify-center p-4 shadow-xl rounded-xl border-2 border-indigo-500/30 h-[150px] md:h-[250px] my-6 hover:opacity-65"
      href={`/blog/${slug}`}
    >
      <h1 className="text-sm md:text-md max-h-[90%] overflow-scroll  text-pretty scroll-m-0 no-scrollbar font-bold">
        {title}
      </h1>
      <Image
        src={coverImage}
        alt="blog image"
        height={470}
        width={470}
        className="size-[50%] md:size-[60%] mx-auto my-6"
      />
    </Link>
  );
};

export default BlogCard;
