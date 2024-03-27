import { type RouterOutputs } from "~/trpc/shared";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { AvatarIcon } from "@radix-ui/react-icons";

function AuthorDetails({
  author,
  blogId,
}: {
  author: RouterOutputs["blogs"]["getBlogDetails"]["author"];
  blogId: number;
}) {
  const { username, about, createdAt, user } = author;
  const { image, name } = user;
  return (
    <aside className="flex w-full flex-col gap-4">
      {/* Author details */}
      <div className="relative overflow-hidden rounded-lg bg-background px-4 py-4">
        <Link href={`/${username}`} className="hover:text-primary-custom">
          <span className="absolute left-0 right-0 top-0 z-[1] h-10 w-full bg-gradient-to-b from-primary via-90% to-primary/80"></span>
          <div className="relative z-10 my-4 flex items-center gap-4">
            {image ? (
              <Image
                src={imageUrl}
                alt="author profile image"
                height={250}
                width={250}
                className="h-16 w-16 overflow-hidden rounded-full text-center text-xs shadow-md shadow-primary ring-2 ring-primary-custom"
              />
            ) : (
              <AvatarIcon
                width={64}
                height={64}
                className="rounded-full bg-white"
              />
            )}
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
      {author.authoredBlogs && (
        <div className="rounded-lg bg-background py-4">
          <h4 className="px-4 pb-4 text-lg">
            More from{" "}
            <span className="capitalize text-primary-custom">{name}</span>
          </h4>
          {author.authoredBlogs
            .filter(({ id }) => id !== blogId)
            .map(({ id, title, blogTags }) => {
              const blogUrl = `/${author.username}/${id}`;
              return (
                <div key={id} className="border-t py-4">
                  <div className="px-4">
                    <Link href={blogUrl} className="group">
                      <h5 className="group-hover:text-primary-custom">
                        {title}
                      </h5>
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
      )}
    </aside>
  );
}

export default AuthorDetails;
