import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
const AuthFooter = () => {
  return (
    <div className="flex flex-row justify-between items-center my-2">
      <button className="w-[45%] flex justify-center items-center py-2 border rounded-2xl  bg-white/20 bg-neutral focus:bg-neutral/40 text-black/50 border-black/40 ">
        <FaGithub className="size-8" />
      </button>
      <button className="w-[45%] flex justify-center items-center py-2 border rounded-2xl  bg-white/20 bg-neutral focus:bg-neutral/40 text-black/50 border-black/40 ">
        <FaGoogle className="size-8 black" />
      </button>
    </div>
  );
};

export default AuthFooter;
