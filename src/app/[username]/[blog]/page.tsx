import { api } from "~/trpc/server";
import BlogInteraction from "./blogInteraction";
import BlogComments from "./blogComments";
import AuthorDetails from "./authorDetails.tsx";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "~/app/loading";
import NotFound from "~/app/not-found";
import MdComponent from "./mdComponent";

async function BlogDetails({
  params,
}: {
  params: { username: string; blog: string };
}) {
  const { username, blog: blogId } = params;

  let blog;
  try {
    blog = await api.blogs.getBlogDetails.query({
      blogId: parseInt(blogId),
    });
  } catch (err) {
    console.error(err);
    return <NotFound />;
  }

  const { imageUrl, desc, content, likes, views, title, updatedAt, comments } =
    blog;

  const contentHtml = await MdComponent(content);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {blog && (
          <div className="grid-rows-auto container mb-20 mt-2 grid grid-flow-row grid-cols-[1fr] gap-4 sm:grid-cols-[min-content_1fr] md:px-2 lg:grid-cols-[min-content_3fr_1fr] lg:px-4 xl:px-8">
            {/* <div className="container mb-20 mt-2 md:px-2 lg:px-4 xl:px-8"> */}
            {/* interaction */}
            <div className="row-span-2 hidden max-w-fit sm:block">
              <BlogInteraction
                id={parseInt(blogId)}
                likes={likes ?? 0}
                comments={comments.length}
                views={views ?? 0}
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
                <div className="overflow-scroll-auto rounded-lg bg-background px-4 pb-8">
                  <h2 className="py-4 text-3xl font-bold">{title}</h2>
                  {/* blog tags */}
                  <div className="px-4">
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
              <AuthorDetails username={username} />
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default BlogDetails;
