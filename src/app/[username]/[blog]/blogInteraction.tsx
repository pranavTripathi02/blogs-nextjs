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
import { type MouseEvent, useState } from "react";
import { toast } from "~/components/ui/use-toast";
import UnauthorizedDialog from "~/app/_components/unauthorizedDialog";

function BlogInteraction({
  id,
  likes,
  comments,
  views,
  bookmarks,
  shares,
}: {
  id: number;
  likes: number;
  comments: number;
  views: number;
  bookmarks: number;
  shares: number;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogLiked, setBlogLiked] = useState(false);
  const [blogBookmarked, setBlogBookmarked] = useState(false);
  const currentPath = usePathname();

  const handleBlogLike = (
    _e: MouseEvent<HTMLButtonElement>,
    _blogId: number,
  ) => {
    setIsDialogOpen(true);
    // e.currentTarget?.classList.add("animate-ping");
    // setBlogLiked((prv) => !prv);
  };
  const handleBlogBookmark = (
    _e: MouseEvent<HTMLButtonElement>,
    _blogId: number,
  ) => {
    setIsDialogOpen(true);
    // e.currentTarget?.classList.add("animate-ping");
    // setBlogBookmarked((prv) => !prv);
  };
  const copyLinkToClipboard = async () => {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT ?? 3000}`;
    const blogLink = baseUrl + currentPath;
    await navigator.clipboard.writeText(blogLink);
  };
  return (
    <>
      <UnauthorizedDialog
        showDialog={isDialogOpen}
        setIsDialogOpen={() => setIsDialogOpen(false)}
      />
      <aside className="sticky left-0 top-0 my-20 flex min-h-full w-[50px] ">
        <div className="fixed flex-col items-center space-y-12 px-4 text-sm text-muted-foreground">
          {/* like */}
          <div className="flex flex-col items-center gap-2">
            <button
              className="group"
              title="Add to liked blogs"
              onClick={(e) => {
                handleBlogLike(e, id);
              }}
              onAnimationEnd={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "animate-ping",
                  "animate-pulse",
                );
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
                handleBlogBookmark(e, id);
              }}
              onAnimationEnd={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "animate-ping",
                  "animate-pulse",
                );
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
              <span>{bookmarks}</span>
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
              <span>{shares}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default BlogInteraction;
