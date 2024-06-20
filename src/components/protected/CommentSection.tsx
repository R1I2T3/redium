"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import Comment from "./Comment";
import { useInView } from "react-intersection-observer";
import { getComments } from "@/action/commentAndBookMarks";
import { useAtom } from "jotai";
import { commentsAtom } from "@/lib/atom";
interface CommentSectionProps {
  blog_id: string;
  user_id: string;
}
const CommentSection = ({ blog_id, user_id }: CommentSectionProps) => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [offset, setOffset] = useState(0);
  const [isDataAvailableToFetch, setIsDataAvailableToFetch] = useState(true);
  const { ref, inView } = useInView();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (inView) {
      if (!isDataAvailableToFetch || comments.length % 5 !== 0) return;
      startTransition(async () => {
        const newComments = await getComments(offset, blog_id);
        if (newComments.length === 0) {
          setIsDataAvailableToFetch(false);
          return;
        }
        setComments((prevComments) => [...prevComments, ...newComments]);
        setOffset((prev) => prev + 1);
      });
    }
  }, [inView, blog_id, isDataAvailableToFetch]);
  return (
    <>
      <div className="flex flex-col gap-3">
        {comments.length !== 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} user_id={user_id} />
          ))}
      </div>
      <div ref={ref} className="flex justify-center items-center mt-3">
        {pending ? <span className="loading loading-spinner "></span> : null}
      </div>
    </>
  );
};

export default CommentSection;
