"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkIcon, ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { RouterOutputs } from "~/trpc/shared";

function BlogCard({ blog }: { blog: RouterOutputs["blogs"]["getBlogs"][0] }) {
  // TODO: add tags
  const { title, author, desc, likes, createdAt, imageUrl, comments } = blog;
  return (
    <div className="mb-4">
      <div className="relative flex flex-col bg-background p-2 px-16">
        <h2 className="cursor-pointer text-2xl font-bold">{title}</h2>
        {/* avatar + name & date */}
        <div className="mb-4 w-fit cursor-pointer">
          <Avatar className="absolute left-4">
            <AvatarImage
              src={imageUrl ?? ""}
              alt="user avatar"
              className="h-10 w-10 rounded-full"
            />
            <AvatarFallback>{author.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text capitalize">{author.name}</span>
            <span className="text-xs">
              {createdAt?.toDateString() ?? "date"}
            </span>
          </div>
        </div>
        {/* tags */}
        {/* <div>{blog_tags && <p className="line-clamp-3">{desc}</p>}</div> */}
        {/* blog desc */}
        <div>{desc && <p className="line-clamp-3">{desc}</p>}</div>
        {/* likes ,comments ,time to read, bookmark */}
        <div className="flex justify-between text-sm">
          <div className="flex space-x-6">
            {/* likes */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="m-0 bg-transparent p-0 hover:bg-transparent"
              >
                <HeartIcon height={16} width={16} />
              </Button>
              <span>{likes} likes</span>
            </div>
            <div className="flex items-center rounded-md p-2 px-4">
              <Link href="#" className="flex gap-2 hover:bg-accent">
                <ChatBubbleIcon height={16} width={16} />
                <span>
                  {comments.length > 0 ? `${comments.length}` : "Add"} comments
                </span>
              </Link>
            </div>
          </div>
          <div className="flex space-x-6">
            {/* time to read */}
            {/* bookmark */}
            <div>
              <Button
                variant="ghost"
                className="m-0 bg-transparent p-0 hover:bg-transparent"
              >
                <BookmarkIcon height={16} width={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
