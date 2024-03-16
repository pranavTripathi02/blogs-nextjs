"use client";
import type { RouterOutputs } from "~/trpc/shared";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

function Comment({
  comment,
}: {
  comment: RouterOutputs["blogs"]["getBlogDetails"]["comments"][0];
}) {
  const handleCommentLike = (_commentId: number) => {
    setCommentLiked((prv) => !prv);
  };
  const [commentLiked, setCommentLiked] = useState(false);
  return (
    <div className="rounded-lg bg-background px-4 pt-4">
      {/* author details */}
      {/* author img */}
      <div className="mb-2 flex flex-col items-start">
        <Link href={`/${comment.commenter.username}`} className="capitalize">
          {comment.commenter.name}
        </Link>
        <span className="text-sm font-light text-muted-foreground">
          {comment.createdAt.toLocaleDateString()}
        </span>
      </div>
      {/* comment text */}
      <p className="text-muted-foreground">{comment.content}</p>
      {/* comment footer */}
      <div className="flex w-full items-center justify-end py-2">
        {/* animate-ping on click */}
        <button
          className="group"
          title="Like comment"
          onClick={(e) => {
            e.currentTarget.classList.add("animate-ping");
            handleCommentLike(comment.id);
          }}
          onAnimationEnd={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("animate-ping", "animate-pulse");
          }}
        >
          {commentLiked ? (
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
        </button>
      </div>
    </div>
  );
}

export default Comment;
