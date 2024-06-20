import React, { useState, useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteCommentAction } from "@/action/commentAndBookMarks";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { commentsAtom } from "@/lib/atom";
interface CommentActionsProps {
  comment: string;
  comment_id: string;
}
const CommentActions = ({ comment, comment_id }: CommentActionsProps) => {
  const [pending, startTransition] = useTransition();
  const [comments, setComments] = useAtom(commentsAtom);
  if (!comment_id) {
    return;
  }
  const onDeleteComment = () => {
    startTransition(async () => {
      console.log(comment_id);
      const data = await deleteCommentAction(comment_id);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success || "comment deleted successfully");
        setComments(comments.filter((comment) => comment.id !== comment_id));
      }
      (
        document.getElementById(
          `deleteCommentDialog+${comment_id}`
        ) as HTMLDialogElement
      ).close();
    });
  };
  const onEditButtonClick = () => {};
  return (
    <div className="space-x-3">
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById(
              `deleteCommentDialog+${comment_id}`
            ) as HTMLDialogElement
          ).showModal()
        }
      >
        <MdDelete size={20} />
      </button>
      <dialog id={`deleteCommentDialog+${comment_id}`} className="modal">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete this comment</p>
          <div className="modal-action ">
            <form method="dialog" className="flex items-center gap-4">
              <button
                className="btn"
                type="button"
                onClick={() =>
                  (
                    document.getElementById(
                      `deleteCommentDialog+${comment_id}`
                    ) as HTMLDialogElement
                  ).close()
                }
              >
                Discard
              </button>
              <button
                className="btn bg-red-500 text-white disabled:bg-red-300"
                type="button"
                disabled={pending}
                onClick={onDeleteComment}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button className="btn">
        <FaRegEdit size={20} />
      </button>
    </div>
  );
};

export default CommentActions;
