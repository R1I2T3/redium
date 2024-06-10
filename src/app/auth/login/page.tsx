import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center card w-full">
      <div className="card-body border rounded-xl shadow-xl w-[95%] md:w-[60%] lg:w-[40%]">
        <div className="card-title m-auto text-2xl">Login</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
