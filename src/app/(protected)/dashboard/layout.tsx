import React from "react";
import SideBar from "./sideBar";

const DashBoardLayout = ({
  children,
  options,
}: Readonly<{
  children: React.ReactNode;
  options: React.ReactNode;
}>) => {
  return (
    <div className="p-0 m-0 flex  max-w-[100vw]">
      <SideBar />
      {children}
      <div className="flex flex-grow w-[80%]">{options}</div>
    </div>
  );
};

export default DashBoardLayout;
