"use client";

import Link from "next/link";
import React, { useTransition } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { deleteBlogAction } from "@/action/blogs";
import toast from "react-hot-toast";
interface BlogPageCreatorActionsProps {
  slug: string | null;
}
const BlogPageCreatorActions = ({ slug }: BlogPageCreatorActionsProps) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const onDeleteBlog = () => {
    startTransition(async () => {
      if (!slug) return;
      const data = await deleteBlogAction(slug);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success || "Blog deleted successfully");
        router.back();
      }
      (document.getElementById("deleteBlog") as HTMLDialogElement).close();
    });
  };
  return (
    <div className="w-[100%] flex justify-between items-center">
      <Link href={`/blog/update/${slug}`} className="btn">
        <FaRegEdit size={30} />
      </Link>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("deleteBlog") as HTMLDialogElement
          ).showModal()
        }
      >
        <MdDelete size={30} />
      </button>
      <dialog id={`deleteBlog`} className="modal">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete this Blog</p>
          <div className="modal-action ">
            <form method="dialog" className="flex items-center gap-4">
              <button
                className="btn"
                type="button"
                onClick={() =>
                  (
                    document.getElementById(`deleteBlog`) as HTMLDialogElement
                  ).close()
                }
              >
                Discard
              </button>
              <button
                className="btn bg-red-500 text-white disabled:bg-red-300"
                type="button"
                disabled={pending}
                onClick={onDeleteBlog}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BlogPageCreatorActions;
