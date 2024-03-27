import {
  AvatarIcon,
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { type RouterOutputs } from "~/trpc/shared";
import BlogCard from "../_components/blogCard";
import { api } from "~/trpc/server";
import Link from "next/link";

async function AuthorDetails({
  profile,
}: {
  profile: RouterOutputs["profiles"]["getProfile"];
}) {
  const {
    id,
    about,
    github,
    discord,
    twitter,
    facebook,
    username,
    createdAt,
    user,
  } = profile;

  const { image, name } = user;
  const authorBlogs = await api.blogs.getBlogs.query({ authorId: id });

  return (
    <div className="space-y-8">
      {/* details */}
      <section className="relative overflow-hidden rounded-lg bg-background px-8 py-4">
        <span className="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-primary via-90% to-primary/80" />
        {/* image and name */}
        <div className="relative z-10 flex flex-col items-center py-4">
          {image ? (
            <Image
              src={image}
              alt="User image"
              className="mb-2 h-40 w-40 rounded-full shadow-lg shadow-primary outline outline-primary-foreground"
              width={250}
              height={250}
            />
          ) : (
            <AvatarIcon
              width={160}
              height={160}
              className="rounded-full bg-white"
            />
          )}
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-lg font-bold text-muted-foreground">@{username}</p>
        </div>
        {/* about */}
        {about && (
          <div className="my-2 flex flex-col items-center">
            <span className="font-bold text-muted-foreground">About</span>
            <p>{about}</p>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          {/* joined */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-muted-foreground">Joined</span>
            <span className="text-sm">{createdAt.toDateString()}</span>
          </div>
          {/* links */}
          {(github ?? twitter ?? discord ?? facebook) && (
            <div className="flex flex-col gap-1">
              <span className="self-start font-bold text-muted-foreground">
                Find me
              </span>
              <div className="flex gap-2 self-end">
                {twitter && (
                  <Link href={`//twitter.com/${twitter}`}>
                    <TwitterLogoIcon
                      className="hover:text-primary-custom"
                      height={24}
                      width={24}
                    />
                  </Link>
                )}
                {github && (
                  <Link href={`//github.com/${github}`}>
                    <GitHubLogoIcon
                      className="hover:text-primary-custom"
                      height={24}
                      width={24}
                    />
                  </Link>
                )}
                {discord && (
                  <Link href={`//discord.com/${discord}`}>
                    <DiscordLogoIcon
                      className="hover:text-primary-custom"
                      height={24}
                      width={24}
                    />
                  </Link>
                )}
                {facebook && (
                  <Link href={`//instagram.com/${facebook}`}>
                    <InstagramLogoIcon
                      className="hover:text-primary-custom"
                      height={24}
                      width={24}
                    />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* blogslist */}
      <section className="space-y-4 overflow-hidden rounded-lg">
        <div className="px-4">
          {authorBlogs.length ? (
            <h2 className="text-xl ">
              More from <span className="text-primary-custom">{name}</span>
            </h2>
          ) : (
            <h2 className="text-xl ">
              <span className="text-primary-custom">{name}</span> has not
              published any blogs.
            </h2>
          )}
        </div>
        {authorBlogs?.map((blog) => {
          return (
            <div key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default AuthorDetails;
