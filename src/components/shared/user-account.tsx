"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function UserAccount({ className }: { className?: string }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading)
    return (
      <Skeleton
        className={cn(
          "h-9 w-9 rounded-full flex items-center justify-center",
          className
        )}
      >
        <LoaderCircle className="animate-spin" />
      </Skeleton>
    );

  if (!isAuthenticated)
    return (
      <Link href="/login" className={className}>
        <Button variant={"outline"}>Đăng nhập</Button>
      </Link>
    );

  return (
    <Link
      href={isAuthenticated ? `/account/${user?.slug}` : "/login"}
      className={cn(
        "flex bg-accent h-9 w-9 rounded-full items-center justify-center",
        isLoading && "disable",
        className
      )}
    >
      <p className="text-sm">
        {user?.last_name.slice(0, 1)}
        {user?.first_name.slice(0, 1)}
      </p>
    </Link>
  );
}
