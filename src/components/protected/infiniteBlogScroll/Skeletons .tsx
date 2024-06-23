import React from "react";

const Skeletons = () => {
  return (
    <div>
      {[...Array(6)].map((value, index) => (
        <div
          className="flex md:flex-col-reverse  justify-between items-center md:justify-center gap-1 w-[70vw] md:w-[35vw] lg:w-[30vw] md:h-[250px] p-1"
          key={index}
        >
          <span className="flex flex-col gap-1 w-[70%] md:w-[100%]">
            <div className="skeleton h-4 w-[100%] md:w-full"></div>
            <div className="skeleton h-4 w-[100%] md:w-full"></div>
            <div className="skeleton h-4 w-[100%] md:w-full"></div>
          </span>
          <div className="skeleton h-20  md:h-32 w-[30%] md:size-full"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeletons;
