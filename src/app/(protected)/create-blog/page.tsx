import CreateBlogForm from "@/components/protected/CreateBlogForm";
import React from "react";

const CreateBlogPage = () => {
  return (
    <div className="w-[95%] md:w-[70%] lg:w-[50%] m-auto pt-4">
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider mb-4">
        Inspire, Share, Connect – Your Story Starts Here
      </h1>
      <div className="card w-[full] shadow-xl border rounded-xl">
        <CreateBlogForm />
      </div>
    </div>
  );
};

export default CreateBlogPage;
