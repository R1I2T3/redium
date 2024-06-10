"use client";

import { themeAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import React from "react";
import { FaSun, FaRegMoon } from "react-icons/fa";
const AuthHeader = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <nav className="flex justify-between p-4">
      <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
        Redium
      </h1>
      <input
        type="checkbox"
        value={theme}
        className="toggle theme-controller"
      />
    </nav>
  );
};

export default AuthHeader;
