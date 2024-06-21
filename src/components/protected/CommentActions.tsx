import React, { useState, useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  deleteCommentAction,
  updateCommentAction,
} from "@/action/commentAndBookMarks";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { commentsAtom } from "@/lib/atom";
import { CommentSelectType } from "@/lib/db/schema";
interface CommentActionsProps {
  comment: string;
  comment_id: string;
}
const CommentActions = ({ comment, comment_id }: CommentActionsProps) => {
  const [pending, startTransition] = useTransition();
  const [comments, setComments] = useAtom(commentsAtom);
  const [updatedComment, setUpdateComment] = useState(comment);
  if (!comment_id) {
    return;
  }
  const onDeleteComment = () => {
    startTransition(async () => {
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
  const onEditButtonClick = () => {
    if (comment === updatedComment) {
      (
        document.getElementById(
          `updatedComment+${comment_id}`
        ) as HTMLDialogElement
      ).close();
      return;
    }
    startTransition(async () => {
      const data = await updateCommentAction(updatedComment, comment_id);
      if (data.error) {
        toast.error(data.error);
      } else {
        if (!data.updateComment?.comment) return;
        const comment = data.updateComment?.comment;
        setComments(
          comments.map((c) => (c.id === comment_id ? { ...c, comment } : c))
        );
      }
      (
        document.getElementById(
          `updatedComment+${comment_id}`
        ) as HTMLDialogElement
      ).close();
    });
  };
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
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById(
              `updatedComment+${comment_id}`
            ) as HTMLDialogElement
          ).showModal()
        }
      >
        <FaRegEdit size={20} />
      </button>
      <dialog id={`updatedComment+${comment_id}`} className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog" className="flex flex-col w-full gap-3">
              <input
                type="text"
                className="input input-bordered rounded-md"
                placeholder="Enter your comment here"
                value={updatedComment}
                onChange={(e) => setUpdateComment(e.target.value)}
              />
              <div className="flex justify-end gap-3 items-center">
                <button className="btn btn-accent rounded-md px-4">
                  Close
                </button>
                <button
                  className="btn btn-primary rounded-md px-4 disabled:btn-primary "
                  type="button"
                  onClick={onEditButtonClick}
                  disabled={pending}
                >
                  {pending ? "update..." : "update comment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CommentActions;
