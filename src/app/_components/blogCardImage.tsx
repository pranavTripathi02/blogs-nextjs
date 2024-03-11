import Image from "next/image";
import BlogCard from "./blogCard";
import type { TBlog } from "~/server/db/schema/blogs";

function BlogCardImage(blog: TBlog) {
  // console.log(blog);
  return (
    <div>
      <Image src="" alt="blog image" />
      <BlogCard />
    </div>
  );
}

export default BlogCardImage;
