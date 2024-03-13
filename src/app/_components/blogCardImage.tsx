"use client";
import Image from "next/image";
import BlogCard from "./blogCard";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { RouterOutputs } from "~/trpc/shared";
import Link from "next/link";

function BlogCardImage({
  blog,
}: {
  blog: RouterOutputs["blogs"]["getBlogs"][0];
}) {
  const { imageUrl, author, id } = blog;
  const blogUrl = "/" + author.username + "/" + id;
  return (
    <div className="group w-full overflow-hidden rounded-md bg-background shadow-md hover:shadow-lg">
      <Link href={blogUrl}>
        <AspectRatio ratio={16 / 9} className="cursor-pointer overflow-hidden ">
          <Image
            src={imageUrl ?? ""}
            alt="blog image"
            fill
            className="duration-300 group-hover:scale-[1.05]"
          />
        </AspectRatio>
      </Link>
      <BlogCard blog={blog} />
    </div>
  );
}

export default BlogCardImage;
