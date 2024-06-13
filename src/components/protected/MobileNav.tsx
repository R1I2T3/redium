import React from "react";
import { LuLogOut } from "react-icons/lu";
import { logoutAction } from "@/action/logout";
import { CiHome } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
const MobileNav = () => {
  return (
    <div className="flex flex-row gap-5 justify-center items-center md:hidden">
      <ToggleTheme />
      <button
        className="btn rounded-xl"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          )?.showModal()
        }
      >
        <LuLogOut className="size-[30px] hover:opacity-50" />
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to logout</h3>
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
      <div className="btm-nav  bg-current/40 border-t-2 dark:border-t-slate-300 ">
        <Link href={"/"}>
          <CiHome className="size-[25px]" />
          <span className="btm-nav-label">Home</span>
        </Link>
        <Link href={"/create-blog"}>
          <IoIosAddCircle className="size-[25px]" />
          <span className="btm-nav-label">Create</span>
        </Link>
        <Link href={"/dashboard"}>
          <MdOutlineDashboardCustomize className="size-[25px]" />
          <span className="btm-nav-label">Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
