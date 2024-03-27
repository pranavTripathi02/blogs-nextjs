"use client";
import type { RouterOutputs } from "~/trpc/shared";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";
import UnauthorizedDialog from "~/app/_components/unauthorizedDialog";
import { api } from "~/trpc/react";

function Comment({
  comment,
}: {
  comment: RouterOutputs["blogs"]["getBlogDetails"]["comments"][0];
}) {
  const { status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentLiked, setCommentLiked] = useState(false);
  const mutation = api.comments.likeComment.useMutation();

  const unauthorizedAction = () => {
    setIsDialogOpen(true);
  };
  const handleCommentLike = (
    e: MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    if (status === "unauthenticated") unauthorizedAction();
    else {
      const commentLike = mutation.mutate({ commentId, profileId: 1 });
      if (commentLiked) {
        console.log("liked comment", commentLike);
        setCommentLiked(false);
      } else {
        e.currentTarget?.classList.add("animate-ping");
        setCommentLiked(true);
      }
    }
  };
  return (
    <>
      <UnauthorizedDialog
        showDialog={isDialogOpen}
        setIsDialogOpen={() => setIsDialogOpen(false)}
      />
      <div className="rounded-lg bg-background px-4 pt-4">
        {/* author details */}
        {/* author img */}
        <div className="mb-2 flex flex-col items-start">
          <Link href={`/${comment.commenter.username}`}>
            {comment.commenter?.username}
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
              handleCommentLike(e, comment.id);
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
    </>
  );
}

export default Comment;
