import ForgotPasswordEmailForm from "@/components/auth/ForgotPasswordEmailForm";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="card shadow-xl bordered rounded-lg w-[90%] md:w-[60%] lg:w-[30%] px-3">
      <h1 className="label text-md font-semibold mt-4">
        Enter the email of account you want to receive code
      </h1>
      <ForgotPasswordEmailForm />
    </div>
  );
};

export default ForgotPasswordPage;
