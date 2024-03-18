import { Skeleton } from "~/components/ui/skeleton";

function Loading() {
  return (
    <div className="container my-2 h-fit min-w-[20rem] max-w-[30rem] space-y-8 rounded-md bg-background p-8">
      <Skeleton className="h-[525px] w-full rounded-lg">
        <div className="space-y-8 p-8">
          <Skeleton className="mx-auto h-[25px] rounded-lg" />
          <div className="mb-8 h-1" />
          <Skeleton className="h-[25px] w-4/5 rounded-lg" />
          <Skeleton className="h-[25px] w-4/5 rounded-lg" />
          <Skeleton className="h-[25px] w-4/5 rounded-lg" />
          <Skeleton className="h-[40px] w-1/5 rounded-lg" />
          <Skeleton className="h-[10px] w-[150px] rounded-md" />
          <Skeleton className="h-[10px] w-[150px] rounded-md" />
        </div>
      </Skeleton>
    </div>
  );
}

export default Loading;
