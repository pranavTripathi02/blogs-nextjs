import { Skeleton } from "~/components/ui/skeleton";

function Loading() {
  return (
    <div className="cursor-progress">
      <div className="container my-8 grid gap-4 space-y-3 md:grid-flow-col md:grid-cols-[2.5fr_1fr] md:space-y-0">
        <div className="space-y-4">
          <Skeleton className="h-[525px] rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-20" />
            <Skeleton className="h-20 md:h-40" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[325px] rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-20" />
            <Skeleton className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
