import { api } from "~/trpc/server";
import Leftbar from "./_components/leftbar";
import Rightbar from "./_components/rightbar";
import BlogCardImage from "./_components/blogCardImage";
import { Suspense } from "react";
import BlogCard from "./_components/blogCard";

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
        <Suspense fallback={<p>Loading</p>}>
          {blogs && (
            <>
              {blogs[0] && <BlogCardImage blog={blogs[0]} />}
              {blogs[1] && <BlogCardImage blog={blogs[1]} />}
              {blogs.slice(2).map((blog) => {
                return (
                  <div key={blog.id}>
                    <BlogCard blog={blog} />
                  </div>
                );
              })}
            </>
          )}
        </Suspense>
      </section>
      {/* rightbar */}
      <div className="hidden max-w-72 lg:block">
        <Rightbar />
      </div>
    </div>
  );
}
