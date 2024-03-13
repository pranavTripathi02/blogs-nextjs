import { HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { RouterOutputs } from "~/trpc/shared";

function BlogComments({
  comments,
}: {
  comments: RouterOutputs["blogs"]["getBlogDetails"]["comments"];
}) {
  console.log(comments);
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Comments</h3>
      <div className="mt-4 space-y-4">
        {comments?.length &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg bg-background px-4 pt-4"
            >
              <div className="flex items-center gap-4">
                {/* author details */}
                {/* author img */}
                <Link
                  href={`/${comment.commenter.username}`}
                  className="capitalize"
                >
                  {comment.commenter.name}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {comment.createdAt.toLocaleDateString()}
                </span>
              </div>
              {/* comment text */}
              <p>{comment.content}</p>
              {/* comment footer */}
              <div className="flex w-full items-center justify-evenly border-t py-2">
                <HeartIcon height={24} width={24} />
                <HeartIcon height={24} width={24} />
                <HeartIcon height={24} width={24} />
                <HeartIcon height={24} width={24} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BlogComments;
