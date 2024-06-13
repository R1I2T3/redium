"use client";

import React from "react";
import ToggleTheme from "../ToggleTheme";
const AuthHeader = () => {
  return (
    <nav className="flex justify-between p-4 bg-current/30 bg-transparent">
      <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
        Redium
      </h1>
      <ToggleTheme />
    </nav>
  );
};

export default AuthHeader;
