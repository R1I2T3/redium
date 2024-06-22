import Link from "next/link";
import React from "react";

import { SiGoogleanalytics } from "react-icons/si";
import { FaBookmark } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
const SideBar = () => {
  return (
    <div className="sticky top-[100px] left-0 flex flex-col justify-between w-[60px] md:[100px] bordered shadow-2xl p-3 border-black mr-4 h-[60vh] px-[-18px]">
      <Link href={"/dashboard"}>
        <SiGoogleanalytics size={30} className="m-auto" />
      </Link>
      <div className="divider"></div>
      <Link href={"/dashboard/bookmarks"}>
        <FaBookmark size={30} className="m-auto" />
      </Link>
      <div className="divider"></div>
      <Link href={"/dashboard/created"}>
        <IoCreateSharp size={30} className="m-auto" />
      </Link>
      <div className="divider"></div>
    </div>
  );
};

export default SideBar;
