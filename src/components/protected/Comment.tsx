import React from "react";
import CommentActions from "./CommentActions";
import { CommentSelectType } from "@/lib/db/schema";

interface CommentProps {
  comment: CommentSelectType;
  user_id: string;
}
const Comment = ({ comment, user_id }: CommentProps) => {
  return (
    <div className="w-full ">
      <div className="px-3 flex justify-between items-center">
        <h3 className="text-md">{comment.comment}</h3>
        {comment.userId === user_id ? (
          <CommentActions comment_id={comment.id} comment={comment.comment} />
        ) : null}
      </div>
      <div className="divider my-0"></div>
    </div>
  );
};

export default Comment;
