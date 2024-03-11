import { api } from "~/trpc/server";
import Leftbar from "./_components/leftbar";

export default async function Home() {
  // const get = await api.blogs.getBlogs.query()
  // console.log(get);
  return (
    <div className="container mt-2 flex justify-center gap-4 md:px-2 lg:px-4 xl:px-8">
      {/* leftbar */}
      <div className="hidden max-w-72 md:block">
        <Leftbar />
      </div>
      {/* content */}
      <section className="max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
        blanditiis odio, perferendis deleniti fugit cum ipsa sint distinctio
        libero, accusamus soluta! Et laudantium nobis hic perferendis nemo esse
        similique inventore neque, id praesentium tempora enim veritatis sequi
        dolores, accusantium explicabo at, adipisci officia eveniet sunt.
        Excepturi hic exercitationem dolore alias.
      </section>
      {/* rightbar */}
      <div className="hidden max-w-72 lg:block">
        <Leftbar />
      </div>
    </div>
  );
}
