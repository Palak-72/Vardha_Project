import { useState, useEffect } from 'react';

export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-concrete-200 rounded ${className}`} />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-steel-950 p-6 text-center">
      <Skeleton className="h-3 w-8 mx-auto mb-2 bg-steel-800" />
      <Skeleton className="h-6 w-20 mx-auto bg-steel-800" />
      <Skeleton className="h-3 w-16 mx-auto mt-2 bg-steel-800" />
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div className="w-full h-64 bg-concrete-200 animate-pulse" />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-concrete-200 p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
