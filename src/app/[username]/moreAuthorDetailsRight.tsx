import { ChatBubbleIcon, FileTextIcon, HeartIcon } from "@radix-ui/react-icons";
import { type RouterOutputs } from "~/trpc/shared";

function MoreAuthorDetails({
  profile,
}: {
  profile: RouterOutputs["profiles"]["getProfile"];
}) {
  const { likedBlogs, authoredBlogs, comments } = profile;
  return (
    <div className="rounded-lg bg-background p-4 text-muted-foreground">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex items-center justify-around gap-2">
          <FileTextIcon width={24} height={24} />
          <span>{authoredBlogs.length} blogs published</span>
        </div>
        <div className="flex items-center justify-around gap-2">
          <HeartIcon width={24} height={24} />
          <span>{likedBlogs.length} blogs liked</span>
        </div>
        <div className="flex items-center justify-around gap-2">
          <ChatBubbleIcon width={24} height={24} />
          <span>{comments.length} comments</span>
        </div>
      </div>
    </div>
  );
}

export default MoreAuthorDetails;
