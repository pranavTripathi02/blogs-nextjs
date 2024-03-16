import { RouterOutputs } from "~/trpc/shared";

import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";

// import { api } from "~/trpc/server";

async function AuthorDetails({
  author,
  blogId,
}: {
  author: RouterOutputs["blogs"]["getBlogDetails"]["author"];
  blogId: number;
}) {
  const { username, imageUrl, name, about, createdAt } = author;
  return (
    <aside className="flex w-full flex-col gap-4">
      {/* Author details */}
      <div className="relative overflow-hidden rounded-lg bg-background px-4 py-4">
        <Link href={`/${username}`} className="hover:text-primary-custom">
          <span className="absolute left-0 right-0 top-0 z-[1] h-10 w-full bg-primary"></span>
          <div className="relative z-10 my-4 flex items-center gap-4">
            <Image
              src={imageUrl ?? ""}
              alt="author profile image"
              height={250}
              width={250}
              className="h-16 w-16 rounded-full outline outline-primary-foreground"
            />
            <div className="pt-4 lg:pt-0">
              <h3 className="text-xl font-bold capitalize xl:text-2xl">
                {name}
              </h3>
              <span className="lg:hidden">{about}</span>
            </div>
          </div>
        </Link>
        <Button className="my-4 hidden w-full lg:block xl:text-base">
          Follow
        </Button>
        <div className="hidden flex-col gap-4 lg:flex">
          <span>{about}</span>
          <div>
            <span className="block text-muted-foreground">Joined</span>
            <span>{createdAt.toDateString()}</span>
          </div>
        </div>
      </div>
      {/* Author blogs */}
      <div className="rounded-lg bg-background py-4">
        <h4 className="px-4 pb-4 text-lg">
          More from{" "}
          <span className="text-primary-custom capitalize">{name}</span>
        </h4>
        {author.authoredBlogs
          ?.filter(({ id }) => id !== blogId)
          .map(({ id, title, blogTags }) => {
            const blogUrl = `/${author.username}/${id}`;
            return (
              <div key={id} className="group border-t py-4">
                <div className="px-4">
                  <Link href={blogUrl}>
                    <h5 className="group-hover:text-primary-custom">{title}</h5>
                    <div className="my-1 flex flex-wrap gap-2 overflow-x-hidden">
                      {blogTags.map((tagInfo) => (
                        <span
                          key={tagInfo.tag.id}
                          className="text-sm opacity-50 group-hover:opacity-100"
                        >
                          #{tagInfo.tag.tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </aside>
  );
}

export default AuthorDetails;
