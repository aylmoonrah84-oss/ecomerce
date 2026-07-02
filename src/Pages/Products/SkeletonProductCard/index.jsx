import React from "react";

export default function SkeletonProductCard() {
  return (
    <div className="bg-bg-secondary border border-border rounded-card overflow-hidden animate-pulse">

      <div className="h-48 bg-bg-primary" />

      <div className="p-3 flex flex-col gap-2">

        <div className="h-3.5 bg-border rounded-full w-full" />
        <div className="h-3.5 bg-border rounded-full w-2/3" />

        <div className="h-3 bg-border rounded-full w-1/2" />
        <div className="h-3 bg-border rounded-full w-1/3" />

        <div className="h-3 bg-border rounded-full w-1/4" />

        <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
          <div className="h-4 bg-border rounded-full w-24" />
          <div className="h-3 bg-border rounded-full w-12" />
        </div>

      </div>
    </div>
  );
}