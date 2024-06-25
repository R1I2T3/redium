import { getBlogs } from "@/action/user";
import BlogsSections from "@/components/protected/BlogsSections";
import HomeScreenSearchBar from "@/components/protected/HomeScreenSearchBar";
import { notFound } from "next/navigation";
import React from "react";
interface HomePageProps {
  searchParams: {
    q: string;
  };
}
const HomePage = async ({ searchParams: { q } }: HomePageProps) => {
  const data = await getBlogs({ offset: 0, type: "", q });
  if (!data || data.error) return notFound();
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeScreenSearchBar search={q} />
      <li key={Math.random()} className="w-[100%] m-auto">
        <BlogsSections initialData={data.blogs} q={q} />
      </li>
    </div>
  );
};
export default HomePage;
