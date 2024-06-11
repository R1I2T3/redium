import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
const AuthFooter = () => {
  return (
    <div className="flex flex-row justify-between items-center my-2">
      <Link
        className="w-[45%] flex justify-center items-center py-2 border rounded-2xl  bg-white/20 bg-neutral focus:bg-neutral/40 text-black/50 border-black/40 "
        href={"/api/auth/github"}
      >
        <FaGithub className="size-8" />
      </Link>
      <Link
        className="w-[45%] flex justify-center items-center py-2 border rounded-2xl  bg-white/20 bg-neutral focus:bg-neutral/40 text-black/50 border-black/40 "
        href={"/api/auth/google"}
      >
        <FaGoogle className="size-8 black" />
      </Link>
    </div>
  );
};

export default AuthFooter;
