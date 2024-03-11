import type { TBlog } from "~/server/db/schema/blogs";
import BlogCardImage from "./blogCardImage";

function BlogsList({ blogs }: { blogs: TBlog[] }) {
  return (
    <div>
      {blogs.map((blog: TBlog) => {
        return (
          <div key={blog.id}>
            <BlogCardImage blog={blog} />
          </div>
        );
      })}
    </div>
  );
}

export default BlogsList;
