"use client";

import React from "react";
import ImageDragAndDrop from "./ImageDragAndDrop";
import TextEditor from "./TextEditor";
import { useForm } from "react-hook-form";

const CreateBlogForm = () => {
  const {} = useForm();
  return (
    <form className="flex flex-col gap-3 p-4">
      <label className="label font-bold text-xl" htmlFor="title">
        Title
      </label>
      <input
        className="input input-bordered rounded-lg"
        placeholder="Enter the title here"
        name="title"
      />
      <label className="label font-bold text-xl" htmlFor="label">
        Cover Image
      </label>
      <ImageDragAndDrop />
      <label className="label font-bold text-xl">Blog content</label>
      <TextEditor />
      <button className="btn btn-outline hover:bg-primary-content hover:text-primary">
        Create blog
      </button>
    </form>
  );
};

export default CreateBlogForm;
