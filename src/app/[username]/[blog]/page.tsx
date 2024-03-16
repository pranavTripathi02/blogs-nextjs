import { api } from "~/trpc/server";
import BlogInteraction from "./blogInteraction";
import BlogComments from "./blogComments";
import AuthorDetails from "./authorDetails";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "~/app/loading";
import NotFound from "~/app/not-found";
import MdComponent from "./mdComponent";
import Link from "next/link";

async function BlogDetails({
  params,
}: {
  params: { username: string; blog: string };
}) {
  const { blog } = params;
  const blogId = parseInt(blog);

  let blogFound;
  try {
    blogFound = await api.blogs.getBlogDetails.query({
      blogId: blogId,
    });
  } catch (err) {
    console.error(err);
    return <NotFound />;
  }

  const {
    imageUrl,
    author,
    content,
    likes,
    views,
    shares,
    bookmarks,
    title,
    createdAt,
    comments,
    blogTags,
  } = blogFound;

  const contentHtml = await MdComponent(content);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {blog && (
          <div className="grid-rows-auto container mb-20 mt-2 grid grid-flow-row grid-cols-[1fr] gap-4 sm:grid-cols-[min-content_1fr] md:px-4 lg:grid-cols-[min-content_3fr_1.2fr] xl:px-8">
            {/* <div className="container mb-20 mt-2 md:px-2 lg:px-4 xl:px-8"> */}
            {/* interaction */}
            <div className="row-span-2 hidden max-w-fit sm:block">
              <BlogInteraction
                id={blogId}
                likes={likes ?? 0}
                comments={comments.length}
                views={views ?? 0}
                shares={shares ?? 0}
                bookmarks={bookmarks ?? 0}
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <div>
                {/* blog image*/}
                {imageUrl && (
                  <div className="h-[300px] w-full overflow-hidden object-cover lg:h-[500px]">
                    <Image
                      src={imageUrl ?? ""}
                      alt="blog image"
                      height="850"
                      width="1850"
                    />
                  </div>
                )}
                {/* blog content*/}
                <div className="overflow-scroll-auto rounded-lg bg-background px-8 pb-8">
                  <div className="space-y-4 py-4">
                    <div>
                      <span className="p-0 text-sm text-muted-foreground">
                        Posted on {createdAt?.toDateString()}
                      </span>
                      <h2 className="text-3xl font-bold">{title}</h2>
                    </div>
                    {/* blog tags */}
                    <div>
                      {blogTags && (
                        <div className="my-1 flex flex-wrap gap-2 overflow-x-hidden">
                          {blogTags.map((tagInfo) => (
                            <Link
                              key={tagInfo.tag.id}
                              href="#"
                              className="hover:text-primary-custom rounded-xl bg-secondary px-2"
                            >
                              #{tagInfo.tag.tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="">
                    {contentHtml && (
                      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    )}
                  </div>
                </div>
                {/* comments */}
              </div>
              <div id="comments" className="px-4">
                <BlogComments comments={comments} />
              </div>
            </div>
            {/* author details */}
            <div className="">
              <AuthorDetails author={author} blogId={blogId} />
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default BlogDetails;
