import { type RouterOutputs } from "~/trpc/shared";
import Comment from "./commentComponent";
import { Textarea } from "~/components/ui/textarea";

function BlogComments({
  comments,
}: {
  comments: RouterOutputs["blogs"]["getBlogDetails"]["comments"];
}) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Comments</h3>
      {/* todo: functionality */}
      <div className="mt-4">
        <Textarea
          className="h-32 resize-none bg-background md:h-24"
          placeholder="Add to the discussion."
          maxLength={250}
          autoComplete="off"
        />
        <p className="text-sm text-muted-foreground">
          Please limit your comment to 250 characters.
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {comments?.length &&
          comments.map((comment) => (
            <div key={comment.id}>
              <Comment comment={comment} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default BlogComments;
