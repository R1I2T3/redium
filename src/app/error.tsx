"use client";
import React from "react";
import { BiSolidError } from "react-icons/bi";
import { useRouter } from "next/navigation";
const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center">
      <BiSolidError className="size-[100px] text-red-600" />
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        Some Server side error taken place
      </h1>
      <button
        className="text-blue-500 text-md hover:underline underline-offset-2"
        onClick={() => router.back()}
      >
        Go back to previous page
      </button>
    </div>
  );
};

export default ErrorPage;
