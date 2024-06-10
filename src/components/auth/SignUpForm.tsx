"use client";

import React from "react";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
const SignUpForm = () => {
  return (
    <form className="flex flex-col justify-center  w-full">
      <label className="label font-semibold">Username</label>
      <input
        className="input input-bordered mb-1 rounded-md"
        placeholder="Eg.John Doe"
        type="text"
      />
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
      <Link
        href={"/auth/login"}
        className="hover:underline underline-offset-4 text-right my-2 text-sm text-blue-500"
      >
        {"Already have account"}
      </Link>
      <button className="bg-primary text-primary-content rounded-md p-2 hover:bg-primary/90">
        Login
      </button>
      <AuthFooter />
    </form>
  );
};

export default SignUpForm;
