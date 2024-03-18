import Leftbar from "./_components/leftbar";
import Rightbar from "./_components/rightbar";
import { Suspense } from "react";
import BlogsList from "./(blogsList)/blogsList";
import Loading from "./loading";

export default async function Home() {
  return (
    <div className="container mb-20 flex justify-center gap-4 lg:px-4 xl:px-8">
      {/* leftbar */}
      <div className="hidden max-w-72 md:block">
        <Leftbar />
      </div>
      {/* content */}
      <section className="w-full max-w-2xl">
        <Suspense fallback={<Loading />}>
          <BlogsList sortBy="createdAt" sortDir="desc" />
        </Suspense>
      </section>
      {/* rightbar */}
      <div className="hidden max-w-72 lg:block">
        <Rightbar />
      </div>
    </div>
  );
}
