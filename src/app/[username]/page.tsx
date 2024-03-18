import { api } from "~/trpc/server";
import Leftbar from "../_components/leftbar";
import NotFound from "../not-found";
import Loading from "./loading";
import { Suspense } from "react";
import AuthorDetails from "./authorDetails";
import MoreAuthorDetails from "./moreAuthorDetailsRight";

async function UserProfile({ params }: { params: { username: string } }) {
  const { username } = params;

  let profile;
  try {
    profile = await api.profiles.getProfile.query({ username });
    // console.log(user);
  } catch (err) {
    // console.error(err);
    return <NotFound />;
  }
  return (
    <div className="container mb-20 flex justify-center gap-4 lg:px-4 xl:px-8">
      {/* leftbar */}
      <div className="hidden max-w-72 md:block">
        <Leftbar />
      </div>
      {/* content */}
      <section className="w-full max-w-2xl">
        <Suspense fallback={<Loading />}>
          <AuthorDetails profile={profile} />
        </Suspense>
      </section>
      {/* rightbar */}
      <div className="hidden max-w-72 lg:block">
        <MoreAuthorDetails profile={profile} />
      </div>
    </div>
  );
}
export default UserProfile;
