"use client";

import React, { useState, useTransition } from "react";
import { VerifyForgotPasswordAction } from "@/action/auth";
import { MdCancel } from "react-icons/md";

const ForgotPasswordVerifyOtpForm = ({ username }: { username: string }) => {
  const [pending, startTransition] = useTransition();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = await VerifyForgotPasswordAction(otp, username);
        if (data.error) {
          setError(data.error);
        }
      } catch (error) {
        setError("some server side error taken place");
      }
    });
  };
  return (
    <form
      className="flex flex-col gap-3 justify-between mb-3"
      onSubmit={onSubmit}
    >
      <input
        className="input input-bordered rounded-md"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-primary rounded-md p-2 "
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Verify otp"
        )}
      </button>
      {error && (
        <div className="bg-red-500/80 text-white p-3 rounded-md flex justify-between items-center">
          {error}
          <button onClick={() => setError("")}>
            <MdCancel className="text-[25px]" />
          </button>
        </div>
      )}
    </form>
  );
};

export default ForgotPasswordVerifyOtpForm;
