import React from 'react';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge('skeleton', className)}
      {...props}
    />
  );
};

export const PostSkeleton = () => (
  <div className="card h-full">
    <div className="h-48 skeleton rounded-none" />
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 skeleton" />
      <div className="space-y-2">
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-5/6 skeleton" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="h-10 w-10 rounded-full skeleton" />
        <div className="h-4 w-24 skeleton" />
      </div>
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="card p-6">
        <div className="h-4 w-24 skeleton mb-2" />
        <div className="h-8 w-16 skeleton" />
      </div>
    ))}
  </div>
);

export default Skeleton;
