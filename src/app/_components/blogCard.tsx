"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkIcon, ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { RouterOutputs } from "~/trpc/shared";

function BlogCard({ blog }: { blog: RouterOutputs["blogs"]["getBlogs"][0] }) {
  // TODO: add tags
  const { title, author, desc, likes, createdAt, imageUrl, comments } = blog;
  const blogDate = createdAt?.toDateString();
  const blogUrl = author.username.replace("/ /g", "") + "/" + blog.id;
  return (
    <div className="relative flex flex-col space-y-2 rounded-md bg-background p-2 shadow-md hover:shadow-lg md:space-y-0 md:px-16">
      <h2 className="hover:text-primary-custom cursor-pointer text-2xl font-bold">
        <Link href={blogUrl}>{title}</Link>
      </h2>
      {/* avatar + name & date */}
      <div className="mb-4 flex w-fit cursor-pointer space-x-4 md:block md:space-x-0">
        <Link href={`/${author.username}`}>
          <Avatar className="left-4 md:absolute">
            <AvatarImage
              src={imageUrl ?? ""}
              alt="user avatar"
              className="h-10 w-10 rounded-full"
            />
            <AvatarFallback>{author.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text capitalize">{author.name}</span>
            <span className="text-xs">{blogDate ?? "date"}</span>
          </div>
        </Link>
      </div>
      {/* tags */}
      {/* <div>{blog_tags && <p className="line-clamp-3">{desc}</p>}</div> */}
      {/* blog desc */}
      <div>{desc && <p className="my-4 line-clamp-3">{desc}</p>}</div>
      {/* likes ,comments ,time to read, bookmark */}
      <div className="flex justify-between text-sm">
        <div className="flex space-x-2 md:space-x-6">
          {/* likes */}
          <Link href={blogUrl} className="m-0 flex items-center space-x-2">
            <HeartIcon height={16} width={16} aria-label="blog likes" />
            <span>{likes} likes</span>
          </Link>
          <Link
            href={`${blogUrl}/#comments`}
            className="m-0 flex items-center space-x-2"
          >
            <ChatBubbleIcon height={16} width={16} aria-label="blog comments" />
            <span>
              {comments.length > 0 ? `${comments.length}` : "Add"} comments
            </span>
          </Link>
        </div>
        <div className="flex space-x-6">
          {/* time to read */}
          {/* bookmark */}
          <div>
            <Button
              variant="ghost"
              className="m-0 bg-transparent p-0 hover:bg-transparent"
            >
              <BookmarkIcon height={16} width={16} aria-label="bookmark blog" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
