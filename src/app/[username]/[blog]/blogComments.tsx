"use client";
import { type RouterOutputs } from "~/trpc/shared";
import Comment from "./commentComponent";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import UnauthorizedDialog from "~/app/_components/unauthorizedDialog";
import { useSession } from "next-auth/react";

function BlogComments({
  comments,
}: {
  comments: RouterOutputs["blogs"]["getBlogDetails"]["comments"];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentPosting, setIsCommentPosting] = useState(false);
  const { status } = useSession();
  const unauthorizedAction = () => {
    setIsDialogOpen(true);
  };
  const postComment = () => {
    if (status === "unauthenticated") unauthorizedAction();
    else {
      setIsCommentPosting(true);
    }
  };
  return (
    <>
      <UnauthorizedDialog
        showDialog={isDialogOpen}
        setIsDialogOpen={() => setIsDialogOpen(false)}
      />
      <div className="my-8">
        <h3 className="text-lg font-bold">
          <a id="comments" className="pt-16">
            Comments
          </a>
        </h3>
        {/* todo: functionality */}
        <div className="mt-4">
          <Textarea
            className="h-32 resize-none bg-background md:h-24"
            placeholder="Add to the discussion."
            maxLength={250}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            autoComplete="off"
          />
          <p className="text-sm text-muted-foreground">
            Please limit your comment to 250 characters.
          </p>
        </div>
        <div className="ml-auto h-fit w-fit border">
          <Button
            onClick={postComment}
            disabled={isCommentPosting}
            className={`${commentText.length > 0 ? "visible" : "invisible"}`}
          >
            Comment
          </Button>
        </div>
        <div className="my-4 space-y-4">
          {comments?.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id}>
                <Comment comment={comment} />
              </div>
            ))
          ) : (
            <div className="mb-12">
              <span className="text-muted-foreground">
                Be the first to comment on this blog.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogComments;
