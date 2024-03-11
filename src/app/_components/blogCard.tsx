"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function BlogCard({ blog }: { blog: any }) {
  const { title, author, createdAt, imageUrl } = blog;
  console.log(blog);
  const desc = "";
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
            <AvatarFallback>{author.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text capitalize">{author.name}</span>
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
