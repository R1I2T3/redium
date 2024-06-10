"use client";

import React from "react";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
const LoginForm = () => {
  return (
    <form className="flex flex-col justify-center  w-full">
      <label className="label font-semibold">Email</label>
      <input
        className="input input-bordered mb-1 rounded-md"
        placeholder="Eg.john@gmail.com"
        type="text"
      />
      <label className="label font-semibold">Password</label>
      <input
        className="input input-bordered mb-1 rounded-md"
        placeholder="Eg.john@12345"
        type="password"
      />
      <div className="flex justify-between text-sm my-2 text-blue-500">
        <Link
          href={"/auth/forgot_password"}
          className="hover:underline underline-offset-4"
        >
          forgot password
        </Link>
        <Link
          href={"/auth/signup"}
          className="hover:underline underline-offset-4"
        >
          {"Don't have account"}
        </Link>
      </div>
      <button className="bg-primary text-primary-content rounded-md p-2 hover:bg-primary/90">
        Login
      </button>
      <AuthFooter />
    </form>
  );
};

export default LoginForm;
