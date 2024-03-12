import { RouterOutputs } from "~/trpc/shared";
import BlogCardImage from "../_components/blogCardImage";
import BlogCard from "../_components/blogCard";

function BlogsList({ blogs }: { blogs: RouterOutputs["blogs"]["getBlogs"] }) {
  return (
    <>
      {blogs && (
        <>
          {blogs[0] && <BlogCardImage blog={blogs[0]} />}
          {blogs[1] && <BlogCardImage blog={blogs[1]} />}
          {blogs.slice(2).map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCard blog={blog} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default BlogsList;
