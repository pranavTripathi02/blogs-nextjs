"use client";
import Image from "next/image";
import BlogCard from "./blogCard";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { RouterOutputs } from "~/trpc/shared";

function BlogCardImage({
  blog,
}: {
  blog: RouterOutputs["blogs"]["getBlogs"][0];
}) {
  const { imageUrl } = blog;
  return (
    <div className="group my-4 w-full overflow-hidden rounded-md bg-background shadow-md hover:shadow-lg">
      <AspectRatio ratio={16 / 9} className="cursor-pointer overflow-hidden ">
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
