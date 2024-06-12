import NewPasswordForm from "@/components/auth/NewPasswordForm";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const NewPasswordPage = () => {
  const forgot_password_cookie = cookies().get("forgot_password_cookie");
  if (!forgot_password_cookie) {
    return redirect("/auth/login");
  }
  console.log(forgot_password_cookie);
  return (
    <div className="card bordered shadow-xl w-[90%] md:w-[60%] lg:w-[30%] rounded-lg px-5 py-3">
      <h1 className="m-auto font-semibold text-xl mb-4">New Password</h1>
      <NewPasswordForm />
    </div>
  );
};

export default NewPasswordPage;
