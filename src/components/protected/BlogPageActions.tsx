"use client";

import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const BlogPageActions = () => {
  return (
    <div>
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <button>
          <FaPencilAlt size={30} />
        </button>
        <button>
          <CiBookmark size={30} />
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default BlogPageActions;
