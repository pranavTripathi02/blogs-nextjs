import { AvatarIcon, ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { RouterOutputs } from "~/trpc/shared";

function BlogCard({ blog }: { blog: RouterOutputs["blogs"]["getBlogs"][0] }) {
  // TODO: add tags
  const { title, author, desc, likes, createdAt, blogTags, comments } = blog;
  const blogDate = createdAt?.toDateString();
  const blogUrl = author.username.replace("/ /g", "") + "/" + blog.id;
  return (
    <div className="relative flex flex-col space-y-2 rounded-md bg-background p-2 shadow-sm hover:shadow-lg md:space-y-0 md:px-16">
      <Link href={blogUrl}>
        <h2 className="hover:text-primary-custom cursor-pointer text-2xl font-bold">
          {title}
        </h2>
      </Link>
      {/* tags */}
      <div>
        {blogTags && (
          <div className="my-1 flex flex-wrap gap-2 overflow-x-hidden">
            {blogTags.map((tagInfo) => (
              <Link
                key={tagInfo.tag.id}
                href="#"
                className="hover:text-primary-custom rounded-xl bg-secondary px-2 py-1 text-sm"
              >
                #{tagInfo.tag.tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* avatar + name & date */}
      <div>
        <Link
          href={`/${author.username}`}
          className="mb-4 flex w-fit cursor-pointer space-x-2 md:block md:space-x-0"
        >
          <div className="left-4 inline-block overflow-hidden md:absolute">
            <Suspense fallback={<AvatarIcon />}>
              <Image
                src={author.imageUrl ?? ""}
                alt="user img"
                className="h-10 w-10 rounded-full text-center text-xs"
                width={100}
                height={100}
              />
            </Suspense>
          </div>
          <div className="flex flex-col">
            <span className="text capitalize">{author.name}</span>
            <span className="text-xs">{blogDate ?? "date"}</span>
          </div>
        </Link>
      </div>
      {/* <div>{blog_tags && <p className="line-clamp-3">{desc}</p>}</div> */}
      {/* blog desc */}
      <div>{desc && <p className="mt-2 line-clamp-3">{desc}</p>}</div>
      {/* likes ,comments ,time to read, bookmark */}
      <div className="flex justify-between pb-1 pt-4 text-sm">
        <div className="flex space-x-2 md:space-x-6">
          {/* likes */}
          <Link href={blogUrl} className="m-0 flex items-center space-x-2">
            <HeartIcon height={16} width={16} aria-label="blog likes" />
            <span>{likes} likes</span>
          </Link>
          <Link
            href={`${blogUrl}/#comments`}
            className="m-0 flex items-center space-x-2"
          >
            <ChatBubbleIcon height={16} width={16} aria-label="blog comments" />
            <span>
              {comments.length > 0 ? `${comments.length}` : "Add"} comments
            </span>
          </Link>
        </div>
        <div className="flex space-x-6">
          {/* time to read */}
          {/* bookmark */}
          {/* <div> */}
          {/*   <Link */}
          {/*     href={blogUrl} */}
          {/*     className="m-0 flex items-center space-x-2 bg-transparent p-0 hover:bg-transparent" */}
          {/*   > */}
          {/*     <BookmarkIcon height={16} width={16} aria-label="bookmark blog" /> */}
          {/*     <span>{bookmarks}</span> */}
          {/*   </Link> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
