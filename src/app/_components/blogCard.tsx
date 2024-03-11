"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { TBlog } from "~/server/db/schema/blogs";
import { api } from "~/trpc/react";

function BlogCard({ blog }: { blog: TBlog }) {
  const { title, authorId, createdAt, imageUrl } = blog;
  const desc = "";
  const userName = api.users.userName.useQuery({ authorId });
  console.log(userName.data);
  return (
    <div className="cursor-pointer">
      <div className="relative flex flex-col bg-background p-2 px-16">
        <h2 className="text-2xl font-bold">{title}</h2>
        {/* avatar + name & date */}
        <div className="mb-4">
          <Avatar className="absolute left-4">
            <AvatarImage
              src={imageUrl ?? ""}
              alt="user avatar"
              className="h-10 w-10 rounded-full"
            />
            <AvatarFallback>{userName.data}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text capitalize">{userName.data}</span>
            <span className="text-xs">
              {createdAt?.toDateString() ?? "date"}
            </span>
          </div>
        </div>
        {/* blog desc */}
        <div>{desc && <p className="line-clamp-3">{desc}</p>}</div>
        {/* tags */}
        {/* likes ,comments ,time to read, bookmark */}
      </div>
    </div>
  );
}

export default BlogCard;
