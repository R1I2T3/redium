"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
import { LoginSchema, LoginType } from "@/lib/schema.ts";
import { LoginAction } from "@/action/auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const [error, setError] = useState<any>("");
  const [pending, startTransition] = useTransition();
  const onSubmit = (values: LoginType) => {
    startTransition(async () => {
      const data = await LoginAction(values);
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
      <div className="flex justify-between text-sm my-2 text-blue-500">
        <Link
          href={"/auth/forgot-password"}
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
      <button
        className="bg-primary text-primary-content rounded-md p-2 hover:bg-primary/90"
        type="submit"
      >
        {pending ? <span className="loading loading-spinner"></span> : "Login"}
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

export default LoginForm;
