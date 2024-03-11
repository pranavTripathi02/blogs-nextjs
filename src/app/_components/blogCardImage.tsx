"use client";
import Image from "next/image";
import BlogCard from "./blogCard";
import type { TBlog } from "~/server/db/schema/blogs";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

function BlogCardImage({ blog }: { blog: TBlog }) {
  const { imageUrl } = blog;
  return (
    <div className="group my-4 w-full cursor-pointer overflow-hidden rounded-md bg-background shadow-md hover:shadow-lg">
      <AspectRatio ratio={16 / 9} className="overflow-hidden">
        <Image
          src={imageUrl ?? ""}
          alt="blog image"
          fill
          className="duration-300 group-hover:scale-[1.05]"
        />
      </AspectRatio>
      <BlogCard blog={blog} />
    </div>
  );
}

export default BlogCardImage;
