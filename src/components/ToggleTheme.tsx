import React from "react";
import { themeAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { LuMoon, LuSunMedium, LuSunMoon } from "react-icons/lu";
const ToggleTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value={theme}
        className="theme-controller"
        onChange={() => {
          if (theme == "sunset") {
            setTheme("cupcake");
            return;
          }
          setTheme("sunset");
        }}
      />

      {theme === "sunset" && <LuSunMedium className="size-[30px]" />}
      {theme !== "sunset" && <LuMoon className="size-[30px]" />}
    </label>
  );
};

export default ToggleTheme;
