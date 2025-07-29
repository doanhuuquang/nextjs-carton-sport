"use client";

import { PostCard } from "@/components/shared/post-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/types/category";
import { Post } from "@/types/post";
import React, { useEffect, useState } from "react";

export default function PostsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("Công nghệ");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="space-y-10 py-10">
      <div className="relative w-full">
        <div className="absolute top-0 right-0 h-full w-3 bg-gradient-to-l from-background to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-3 bg-gradient-to-r from-background to-transparent"></div>
        <div className="flex gap-3 overflow-auto max-w-7xl  mx-auto px-3 hide-scrollbar">
          {loading ? (
            <>
              <Skeleton className="h-[50px] w-full rounded-sm" />
              <Skeleton className="h-[50px] w-full rounded-sm" />
              <Skeleton className="h-[50px] w-full rounded-sm" />
              <Skeleton className="h-[50px] w-full rounded-sm" />
              <Skeleton className="h-[50px] w-full rounded-sm" />
            </>
          ) : (
            categories.map((category) => (
              <Button
                variant={
                  currentCategory === category.name ? "default" : "outline"
                }
                key={category.name}
                onClick={() => setCurrentCategory(category.name)}
              >
                {category.name}
              </Button>
            ))
          )}
        </div>
      </div>

      <div className="w-full px-3 max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-flow-row gap-5">
        {loading ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : (
          posts.map(
            (post) =>
              post.category.some((cat) => cat.name === currentCategory) && (
                <PostCard key={post.slug} post={post} />
              )
          )
        )}
      </div>
      <div className="flex justify-center items-center w-full gap-1">
        <div className="h-[1px] w-3 bg-muted-foreground/30"></div>
        <p className="text-muted-foreground/30 text-sm">Đã xem hết</p>
        <div className="h-[1px] w-3 bg-muted-foreground/30"></div>
      </div>
    </main>
  );
}

function PostCardSkeleton() {
  return (
    <div className="group overflow-hidden grid gap-3 h-full min-h-[250px] w-full rounded-sm">
      <div className="relative overflow-hidden row-span-1 aspect-[4/2] w-full h-full flex-shrink-0 rounded-sm transition-all duration-300">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 space-y-5">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[15px] w-[80%]" />
      </div>
    </div>
  );
}
