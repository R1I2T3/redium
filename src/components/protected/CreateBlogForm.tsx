"use client";

import React, { useState, useTransition } from "react";
import { draftToMarkdown } from "markdown-draft-js";
import TextEditor from "./TextEditor";
import { useForm, Controller } from "react-hook-form";
import { CreateBlogSchema, CreateBlogType } from "@/lib/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogAction } from "@/action/blogs";
import toast from "react-hot-toast";
const CreateBlogForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBlogType>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      title: "",
      blog: "",
    },
  });
  const [pending, startTransition] = useTransition();
  const [ImageError, setImageError] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onSubmit = (values: CreateBlogType) => {
    if (!values.coverImage) {
      setImageError("Cover Image is required");
      return;
    }
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    startTransition(async () => {
      const response = await createBlogAction(formData);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("blog post created successfully");
        reset();
      }
    });
  };
  return (
    <form className="flex flex-col gap-3 p-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="label font-bold text-xl" htmlFor="title">
        Title
      </label>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            className="input input-bordered rounded-lg"
            placeholder="Enter the title here"
            {...field}
          />
        )}
      />
      {errors.title && (
        <span className="text-md text-red-600">{errors.title.message}</span>
      )}

      <label className="label font-bold text-xl" htmlFor="label">
        Cover Image
      </label>
      <Controller
        control={control}
        name="coverImage"
        render={({ field: { value, ...otherFieldValue } }) => (
          <input
            type="file"
            {...otherFieldValue}
            accept="image/"
            className="file-input file-input-bordered rounded-md"
            onChange={(e: any) => {
              const file = e.target.files?.[0];
              otherFieldValue.onChange(file);
              setImageError("");
            }}
          />
        )}
      />
      {(errors.coverImage || ImageError) && (
        <span className="text-md text-red-600">
          {errors.coverImage?.message || ImageError}
        </span>
      )}
      <label className="label font-bold text-xl">Blog content</label>
      <Controller
        control={control}
        name="blog"
        render={({ field }) => (
          <TextEditor
            ref={field.ref}
            onChange={(draft) => field.onChange(draftToMarkdown(draft))}
          />
        )}
      />
      {errors.blog && (
        <span className="text-md text-red-600">{errors.blog.message}</span>
      )}
      <button
        className="btn btn-outline rounded-md"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Create Blog"
        )}
      </button>
    </form>
  );
};

export default CreateBlogForm;
