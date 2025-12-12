import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonProjects() {
  return (
    <Card className="-space-y-3">
      {/* Header */}
      <CardHeader>
        <div className="w-11 h-11 flex items-center justify-center p-1 rounded-md bg-muted">
          <Skeleton className="w-5 h-5" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        {/* Badge skeleton */}
        <div className="h-6 w-20 rounded-md bg-muted" />
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
