"use client";
import React from "react";
import { TbError404 } from "react-icons/tb";
import { useRouter } from "next/navigation";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-[100dvh] flex-grow justify-center items-center">
      <TbError404 className="size-[100px] text-yellow-600" />
      <h1 className="text-xl font-bold">Page not found</h1>
      <button
        className="text-blue-500 hover:underline underline-offset-2"
        onClick={() => router.back()}
      >
        Go back to previous page
      </button>
    </div>
  );
};

export default NotFoundPage;
