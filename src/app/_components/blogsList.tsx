"use client";
import type { TBlog } from "~/server/db/schema/blogs";
import BlogCardImage from "./blogCardImage";
import { RouterOutputs } from "~/trpc/shared";

function BlogsList() {
  return (
    <div>
      {blogs.map((blog: TBlog) => {
        return (
          <div key={blog.id}>
            <BlogCardImage blog={blog} />
          </div>
        );
      })}
    </div>
  );
}

export default BlogsList;
