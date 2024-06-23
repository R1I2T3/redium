import Image from "next/image";
import React from "react";

const BlogCard = () => {
  return (
    <div className="card flex flex-row md:flex-col-reverse w-[90%] items-center justify-between md:justify-center p-4 shadow-xl rounded-xl border-2 border-indigo-500/30 h-[150px] md:h-[250px] my-6">
      <h1 className="text-sm md:text-md h-[90%] overflow-scroll  text-pretty scroll-m-0 no-scrollbar">
        Next.js is a React framework for building full-stack web
        applications.You use React Components to interfaces, and Next.js for
        additional features and optimizations.
      </h1>
      <Image
        src={"/next.svg"}
        alt="blog image"
        width={20}
        height={20}
        className="h-20 md:h-32 w-[30%] md:size-[70%] aspect-square"
      />
    </div>
  );
};

export default BlogCard;
