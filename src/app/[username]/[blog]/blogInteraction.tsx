"use client";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HeartIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "~/components/ui/use-toast";

function BlogInteraction({
  likes,
  comments,
}: {
  likes: number;
  comments: number;
}) {
  // const {toast} = useToast()
  return (
    <aside className="sticky left-0 top-0 my-20 flex min-h-full w-[50px] ">
      <div className="fixed flex-col items-center space-y-12 px-4 text-sm text-muted-foreground">
        {/* like */}
        <div className="flex flex-col items-center gap-2">
          <button className="duration-200  hover:text-pink-500">
            <HeartIcon height={24} width={24} />
            <span>{likes}</span>
          </button>
        </div>
        {/* comment */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="duration-200  hover:text-primary"
            title="Go to comments"
          >
            <Link href="#comments">
              <ChatBubbleIcon height={24} width={24} />
              <span>{comments}</span>
            </Link>
          </button>
        </div>
        {/* bookmark */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="duration-200  hover:text-yellow-500"
            title="Add blog to bookmarks"
          >
            <BookmarkIcon height={24} width={24} />
            {/* todo dynamic val */}
            <span>32</span>
          </button>
        </div>
        {/* share */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="hover:text-blue-500"
            onClick={() => {
              toast({
                title: "Share",
                description: "Blog link copied to your clipboard",
              });
            }}
          >
            <Share1Icon height={24} width={24} />
            {/* <span>Share</span> */}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default BlogInteraction;
