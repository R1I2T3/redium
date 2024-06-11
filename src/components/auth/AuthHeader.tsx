"use client";

import React from "react";
const AuthHeader = () => {
  return (
    <nav className="flex justify-between p-4 bg-current/30 bg-transparent">
      <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
        Redium
      </h1>
      <input
        type="checkbox"
        value={"dracula"}
        className="toggle theme-controller"
        onChange={(e) => console.log(e.target.value)}
      />
    </nav>
  );
};

export default AuthHeader;
