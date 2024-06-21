"use client";

import { UpdateBlogSchema, UpdateBlogType } from "@/lib/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "./TextEditor";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import { updateBlogAction } from "@/action/blogs";
import toast from "react-hot-toast";
interface UpdateBlogFormProps {
  blog_title: string;
  blog_body: string;
  blog_id: string;
}
const UpdateBlogForm = ({
  blog_title,
  blog_body,
  blog_id,
}: UpdateBlogFormProps) => {
  const [pending, startTransition] = useTransition();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(markdownToDraft(blog_body)))
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateBlogType>({
    resolver: zodResolver(UpdateBlogSchema),
    defaultValues: {
      title: blog_title,
      blog: blog_body,
    },
  });
  const onUpdate = (values: UpdateBlogType) => {
    const formData = new FormData();
    if (values.coverImage) {
      formData.append("coverImage", values.coverImage);
    }
    if (values.title && values.title !== blog_title) {
      formData.append("title", values.title);
    }
    if (values.blog && values.blog !== blog_body) {
      formData.append("blog", values.blog);
    }
    startTransition(async () => {
      const data = await updateBlogAction(formData, blog_id);
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  return (
    <form className="flex flex-col gap-3 p-4" onSubmit={handleSubmit(onUpdate)}>
      <label className="label font-bold text-xl" htmlFor="title">
        Title
      </label>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            className="input input-bordered rounded-lg"
            id="title"
            placeholder="Enter the title here"
            {...field}
          />
        )}
      />
      {errors.title && (
        <span className="text-md text-red-600">{errors.title.message}</span>
      )}

      <label className="label font-bold text-xl" htmlFor="coverImage">
        New Cover Image
      </label>
      <Controller
        control={control}
        name="coverImage"
        render={({ field: { value, ...otherFieldValue } }) => (
          <input
            type="file"
            {...otherFieldValue}
            id="coverImage"
            accept="image/"
            className="file-input file-input-bordered rounded-md"
            onChange={(e: any) => {
              const file = e.target.files?.[0];
              otherFieldValue.onChange(file);
            }}
          />
        )}
      />
      {errors.coverImage && (
        <span className="text-md text-red-600">
          {errors.coverImage?.message}
        </span>
      )}
      <label className="label font-bold text-xl">Blog content</label>
      <Controller
        control={control}
        name="blog"
        render={({ field }) => (
          <TextEditor
            ref={field.ref}
            editorState={editorState}
            onEditorStateChange={(editorState) => setEditorState(editorState)}
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
          "Update blog"
        )}
      </button>
    </form>
  );
};

export default UpdateBlogForm;
