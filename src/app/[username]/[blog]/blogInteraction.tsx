"use client";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  EyeClosedIcon,
  HeartFilledIcon,
  HeartIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "~/components/ui/use-toast";

function BlogInteraction({
  id,
  likes,
  comments,
  views,
}: {
  id: number;
  likes: number;
  comments: number;
  views: number;
}) {
  const [blogLiked, setBlogLiked] = useState(false);
  const [blogBookmarked, setBlogBookmarked] = useState(false);
  const currentPath = usePathname();

  const handleBlogLike = (_blogId: number) => {
    setBlogLiked((prv) => !prv);
  };
  const handleBlogBookmark = (_blogId: number) => {
    setBlogBookmarked((prv) => !prv);
  };
  const copyLinkToClipboard = async () => {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT ?? 3000}`;
    const blogLink = baseUrl + currentPath;
    await navigator.clipboard.writeText(blogLink);
  };
  // const {toast} = useToast()
  return (
    <aside className="sticky left-0 top-0 my-20 flex min-h-full w-[50px] ">
      <div className="fixed flex-col items-center space-y-12 px-4 text-sm text-muted-foreground">
        {/* like */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="group"
            title="Add to liked blogs"
            onClick={(e) => {
              e.currentTarget.classList.add("animate-ping");
              handleBlogLike(id);
            }}
            onAnimationEnd={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("animate-ping", "animate-pulse");
            }}
          >
            {blogLiked ? (
              <HeartFilledIcon
                className="text-pink-500 motion-safe:group-hover:animate-pulse"
                height={24}
                width={24}
              />
            ) : (
              <HeartIcon
                className="group-hover:text-pink-500 motion-safe:hover:animate-pulse"
                height={24}
                width={24}
              />
            )}
            <span>{likes}</span>
          </button>
        </div>
        {/* comment */}
        <div className="flex flex-col items-center gap-2">
          <button className="group" title="Go to comments">
            <Link href="#comments">
              <ChatBubbleIcon
                className="group-hover:text-primary motion-safe:hover:animate-pulse"
                height={24}
                width={24}
              />
              <span>{comments}</span>
            </Link>
          </button>
        </div>
        {/* bookmark */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="group"
            title="Add blog to bookmarks"
            onClick={(e) => {
              e.currentTarget.classList.add("animate-ping");
              handleBlogBookmark(id);
            }}
            onAnimationEnd={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("animate-ping", "animate-pulse");
            }}
          >
            {blogBookmarked ? (
              <BookmarkFilledIcon
                className="text-yellow-500 motion-safe:group-hover:animate-pulse"
                height={24}
                width={24}
              />
            ) : (
              <BookmarkIcon
                className="group-hover:text-yellow-500 motion-safe:group-hover:animate-pulse"
                height={24}
                width={24}
              />
            )}
            {/* todo dynamic val */}
            <span>32</span>
          </button>
        </div>
        {/* views */}
        <div className="flex flex-col items-center gap-2">
          <button className="group cursor-default" title="Blog views">
            <EyeClosedIcon
              className="group-hover:text-green-500 motion-safe:hover:animate-pulse"
              height={24}
              width={24}
            />
            {/* todo dynamic val */}
            <span>{views}</span>
          </button>
        </div>
        {/* share */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="group"
            onClick={() => {
              toast({
                title: "Share",
                description: "Blog link copied to your clipboard",
              });
              copyLinkToClipboard;
            }}
            title="Share"
          >
            <Share1Icon
              className="group-hover:text-blue-500"
              height={24}
              width={24}
            />
            {/* <span>Share</span> */}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default BlogInteraction;
