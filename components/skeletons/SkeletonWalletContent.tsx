import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonWalletContent() {
  return (
    <div className="w-full flex flex-col">
      {/* CardSingleWallet bar */}
      <div className="mt-4 px-4">
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      {/* MenuTabTransactions */}
      <div className="flex items-center gap-6 my-6 mx-auto">
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      {/* Create button + search/filter bar */}
      <div className="px-6 flex flex-col gap-4">
        <Skeleton className="h-9 w-36 rounded-md" />
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      {/* Table rows */}
      <div className="px-6 mt-4 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
