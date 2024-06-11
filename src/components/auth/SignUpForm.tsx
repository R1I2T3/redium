"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
import { signUpSchema, signupType } from "@/lib/schema.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupAction } from "@/action/auth";
const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });
  const [error, setError] = useState<any>("");
  const [pending, startTransition] = useTransition();
  const onSubmit = (values: signupType) => {
    startTransition(async () => {
      const data = await signupAction(values);
      if (data.error) {
        setError(data.error);
      }
    });
  };
  return (
    <form
      className="flex flex-col justify-center  w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="label font-semibold">Username</label>
      <Controller
        control={control}
        render={({ field }) => (
          <input
            className="input input-bordered mb-1 rounded-md"
            placeholder="Eg.John Doe"
            type="text"
            value={field.value}
            onChange={field.onChange}
          />
        )}
        name="username"
      />
      {errors.username && (
        <span className="text-md text-red-600">{errors.username.message}</span>
      )}
      <label className="label font-semibold">Email</label>
      <Controller
        control={control}
        render={({ field }) => (
          <input
            className="input input-bordered mb-1 rounded-md"
            placeholder="Eg.johndoe@gmail.com"
            type="text"
            value={field.value}
            onChange={field.onChange}
          />
        )}
        name="email"
      />
      {errors.email && (
        <span className="text-md text-red-600">{errors.email.message}</span>
      )}
      <label className="label font-semibold">Password</label>
      <Controller
        control={control}
        render={({ field }) => (
          <input
            className="input input-bordered mb-1 rounded-md"
            placeholder="Eg.john@1234"
            type="password"
            value={field.value}
            onChange={field.onChange}
          />
        )}
        name="password"
      />
      {errors.password && (
        <span className="text-md text-red-600">{errors.password.message}</span>
      )}
      <Link
        href={"/auth/login"}
        className="hover:underline underline-offset-4 text-right my-2 text-sm text-blue-500"
      >
        {"Already have account"}
      </Link>
      <button
        className="bg-primary text-primary-content rounded-md p-2 hover:bg-primary/90"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <span className="loading loading-spinner bg-white"></span>
        ) : (
          "Signup"
        )}
      </button>
      <AuthFooter />
      {error && (
        <div className="toast">
          <div className="alert alert-info text-white text-sm">
            <span>{error}</span>
            <button onClick={() => setError("")}>X</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
