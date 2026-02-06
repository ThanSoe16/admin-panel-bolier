'use client';
import { Skeleton } from '@/components/ui/skeleton';

export const MaintenanceSkeleton = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Page Title Skeleton */}
      <Skeleton className="h-8 w-[200px] mb-4" />

      {/* Status Card Skeleton */}
      <div className="w-full rounded-xl p-6 relative flex flex-col md:flex-row items-start gap-4 bg-gray-100/10">
        <Skeleton className="rounded-full w-14 h-14" />

        <div className="flex-1 space-y-3 lg:pr-[120px]">
          <Skeleton className="h-6 w-3/4 max-w-[300px]" />
          <Skeleton className="h-5 w-full max-w-[400px]" />

          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
        </div>

        <Skeleton className="absolute top-4 right-4 w-[150px] h-[175px] hidden lg:block" />
      </div>

      {/* Language Message Sections */}
      <div className="space-y-8 pt-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-[150px]" />
            </div>
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
};
