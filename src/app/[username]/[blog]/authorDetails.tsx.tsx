// import { RouterOutputs } from "~/trpc/shared";

// import { api } from "~/trpc/server";

async function AuthorDetails({ username }: { username: string }) {
  // const userProfile = await api.p
  return (
    <aside className="rounded-lg bg-background px-4 py-8">
      <h3>About the author</h3>
      <div>{username}</div>
    </aside>
  );
}

export default AuthorDetails;
