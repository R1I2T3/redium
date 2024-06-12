"use client";
import { CreateNewPasswordAction } from "@/action/auth";
import React, { useState, useTransition } from "react";
import { MdCancel } from "react-icons/md";
const NewPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (newPassword.length <= 6) {
      setError("New Password  must be more then 6");
    }
    if (newPassword !== confirmNewPassword) {
      setError("Password and confirm password not match");
    }
    startTransition(async () => {
      const response = await CreateNewPasswordAction(newPassword);
      if (response.error) {
        setError(response.error);
      } else {
        setIsSuccess(true);
      }
    });
  };
  return (
    <form className="flex flex-col justify-center gap-3" onSubmit={onSubmit}>
      <label htmlFor="">Enter your new Password</label>
      <input
        type="password"
        className="input input-bordered rounded-md"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label htmlFor="">Confirm your Password</label>
      <input
        type="password"
        className="input input-bordered rounded-md"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <button className="bg-primary p-2 rounded-md">Submit</button>
      {error && (
        <div className="bg-red-500/80 text-white p-3 rounded-md flex justify-between items-center">
          {error}
          <button onClick={() => setError("")}>
            <MdCancel className="text-[25px]" />
          </button>
        </div>
      )}
      {isSuccess && (
        <div className="toast">
          <div className="alert alert-info text-white text-sm">
            <span>Password update successfully please login</span>
            <button onClick={() => setIsSuccess(false)}>X</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewPasswordForm;
