"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "use-debounce";
const HomeScreenSearchBar = ({ search }: { search: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push(`/`);
    } else {
      router.push(`/?q=${query}`);
    }
  }, [query]);
  return (
    <div className="w-[100%] flex justify-center items-center gap-3 my-5">
      <input
        type="text"
        className="input input-bordered w-[90%] md:w-[50%] lg:w-[40%] p-3"
        placeholder="Enter the title of blog you want to search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default HomeScreenSearchBar;
