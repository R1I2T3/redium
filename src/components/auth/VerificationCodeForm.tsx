"use client";

import React, { useTransition } from "react";
import { verificationCodeSchema, verificationCodeType } from "@/lib/schema.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyAccountAction } from "@/action/auth";
interface verificationCodeFormProps {
  username: string;
}
const VerificationCodeForm = ({ username }: verificationCodeFormProps) => {
  console.log(username);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<verificationCodeType>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  });
  const [pending, startTransition] = useTransition();
  const onSubmit = async (values: verificationCodeType) => {
    console.log("I am here");

    startTransition(async () => {
      const data = await verifyAccountAction(values.code, username);
      if (data.error) {
        console.log(data.error);
      }
    });
  };
  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="verification" className="mb-3 font-bold m-auto">
        Enter verification code
      </label>
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
        name="code"
      />
      {errors.code && (
        <span className="text-md text-red-600">{errors.code.message}</span>
      )}
      <button
        className="bg-primary p-2 rounded-lg"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Verify account"
        )}
      </button>
    </form>
  );
};

export default VerificationCodeForm;
