"use client";
import BlogCardImage from "../_components/blogCardImage";
import BlogCard from "../_components/blogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { api } from "~/trpc/react";
import { useState } from "react";
import Loading from "../loading";

function BlogsList({
  sortBy = "createdAt",
  sortDir = "desc",
}: {
  sortBy: "createdAt" | "likes" | "views";
  sortDir: "asc" | "desc";
}) {
  const [page, setPage] = useState<number>(1);

  const blogs = api.blogs.getBlogs.useQuery({
    offset: page * 5 - 5,
    sortBy,
    sortDir,
  }).data;

  const handlePageChange = ({
    pageNum,
    change,
  }: {
    pageNum?: number;
    change?: "inc" | "dec";
  }) => {
    if (pageNum) {
      setPage(pageNum);
    } else if (change === "dec" && page > 1) {
      setPage((prev) => prev - 1);
    } else if (change === "inc") {
      setPage((prev) => prev + 1);
    }
  };

  if (blogs?.length === 0) {
    handlePageChange({ pageNum: 1 });
  }

  return (
    <div>
      {blogs?.length ? (
        <div className="space-y-4">
          {blogs[0] && <BlogCardImage blog={blogs[0]} />}
          {blogs[1] && <BlogCardImage blog={blogs[1]} />}
          {blogs.slice(2).map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCard blog={blog} />
              </div>
            );
          })}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    page > 1 && handlePageChange({ change: "dec" });
                  }}
                  scroll={page > 1}
                />
              </PaginationItem>
              {page > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => {
                      handlePageChange({ pageNum: page - 1 });
                    }}
                  >
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href="#" isActive scroll={false}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => {
                    handlePageChange({ pageNum: page + 1 });
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    handlePageChange({ change: "inc" });
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BlogsList;
