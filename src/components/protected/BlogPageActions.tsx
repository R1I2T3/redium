"use client";

import React, { useState, useTransition } from "react";
import { FaPencilAlt, FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import {
  createCommentAction,
  addToBookMarkAction,
  removeFromBookMarkAction,
} from "@/action/commentAndBookMarks";
import { useAtom } from "jotai";
import { commentsAtom } from "@/lib/atom";
import toast from "react-hot-toast";
interface BlogPageActionsProps {
  blog_id: string;
  isBookmarked: boolean;
}
const BlogPageActions = ({ blog_id, isBookmarked }: BlogPageActionsProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useAtom(commentsAtom);
  const [pending, startTransition] = useTransition();
  const onCreateCommentOnClick = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      setComment("");
      const data = await createCommentAction(comment, blog_id);
      (document.getElementById("my_modal_3") as HTMLDialogElement).close();
      if (data.error) {
        toast.error(data.error);
      }
      if (!data.newComment) return;
      const allComments = [data.newComment, ...comments];
      setComments(allComments);
      console.log(comments);
    });
  };
  const onAddToBookMarkButton = () => {
    startTransition(async () => {
      await addToBookMarkAction(blog_id);
    });
  };
  const onRemoveToBookMarkButton = () => {
    startTransition(async () => {
      await removeFromBookMarkAction(blog_id);
    });
  };
  return (
    <div>
      <div className="divider my-0"></div>
      <div className="flex justify-between items-center">
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            ).showModal()
          }
        >
          <FaPencilAlt size={30} />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <div className="modal-action">
              <form method="dialog" className="flex flex-col w-full gap-3">
                <input
                  type="text"
                  className="input input-bordered rounded-md"
                  placeholder="Enter your comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end gap-3 items-center">
                  <button className="btn btn-accent rounded-md px-4">
                    Close
                  </button>
                  <button
                    className="btn btn-primary rounded-md px-4 disabled:btn-primary "
                    type="button"
                    onClick={onCreateCommentOnClick}
                    disabled={pending}
                  >
                    {pending ? "creating..." : "create comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        {isBookmarked ? (
          <button
            className="btn"
            onClick={() => onRemoveToBookMarkButton()}
            disabled={pending}
          >
            {pending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <FaBookmark size={30} />
            )}
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => onAddToBookMarkButton()}
            disabled={pending}
          >
            {pending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <CiBookmark size={30} />
            )}
          </button>
        )}
      </div>
      <div className="divider my-0"></div>
    </div>
  );
};

export default BlogPageActions;
