"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default forwardRef<Object, EditorProps>(function RichTextEditor(
  props,
  ref
) {
  return (
    <Editor
      editorClassName={
        "border rounded-md px-3 min-h-[300px] cursor-text ring-offset- focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      }
      placeholder="Enter the content of the blog here"
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r);
        } else if (ref) {
          ref.current = r;
        }
      }}
      {...props}
    />
  );
});
