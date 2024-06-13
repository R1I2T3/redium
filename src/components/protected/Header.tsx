"use client";

import React from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { logoutAction } from "@/action/logout";
import ToggleTheme from "../ToggleTheme";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-current/30 border-b-2">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        Redium
      </h1>
      <MobileNav />
      <div className="hidden md:flex justify-center items-center gap-10 font-semibold ">
        <Link href={"/"} className="hover:underline underline-offset-4">
          Home
        </Link>
        <Link
          href={"/create-blog"}
          className="hover:underline underline-offset-4"
        >
          Create a blog
        </Link>
        <Link
          href={"/dashboard"}
          className="hover:underline underline-offset-4"
        >
          Dash Board
        </Link>
        <button
          className="btn rounded-xl"
          onClick={() => document.getElementById("my_modal_2")?.showModal()}
        >
          Logout
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to logout
            </h3>
            <div className="modal-action">
              <form method="dialog" className="flex flex-row gap-5">
                <button className="btn rounded-xl px-6">Close</button>
                <button
                  className="bg-red-500 btn rounded-xl px-6 text-white hover:bg-red-600"
                  onClick={() => logoutAction()}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Header;
