import ForgotPasswordVerifyOtpForm from "@/components/auth/ForgotPasswordVerifyOtpForm";
import React from "react";

interface ForgotPasswordVerifyOtpPageProps {
  searchParams: {
    username: string;
  };
}
const ForgotPasswordVerifyOtpPage = ({
  searchParams: { username },
}: ForgotPasswordVerifyOtpPageProps) => {
  return (
    <div className="card shadow-xl bordered rounded-lg w-[90%] md:w-[60%] lg:w-[30%] px-3">
      <h1 className="label text-md font-semibold mt-4">
        Enter the otp you received on your email
      </h1>
      <ForgotPasswordVerifyOtpForm username={username} />
    </div>
  );
};

export default ForgotPasswordVerifyOtpPage;
