import { api } from "~/trpc/server";
import Leftbar from "./_components/leftbar";
import Rightbar from "./_components/rightbar";
import { Suspense } from "react";
import BlogsList from "./(blogsList)/blogsList";
import Loading from "./loading";

export default async function Home() {
  const blogs = await api.blogs.getBlogs.query({ sortBy: "likes" });

  return (
    <div className="container mt-2 flex justify-center gap-4 md:px-2 lg:px-4 xl:px-8">
      {/* leftbar */}
      <div className="hidden max-w-72 md:block">
        <Leftbar />
      </div>
      {/* content */}
      <section className="w-full max-w-2xl">
        <Suspense fallback={<Loading />}>
          <BlogsList blogs={blogs} />
        </Suspense>
      </section>
      {/* rightbar */}
      <div className="hidden max-w-72 lg:block">
        <Rightbar />
      </div>
    </div>
  );
}
