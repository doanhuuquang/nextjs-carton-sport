"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PostCardMinimal } from "@/components/shared/post-card";

import type { Post } from "@/types/post";
import { Input } from "@/components/ui/input";

export function AppSearch() {
  const [searchedPosts, setSearchedPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchString, setSearchString] = React.useState<string>("");
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (input: string) => {
    setSearchString(input);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      search(input);
    }, 500);
  };

  const search = async (input: string) => {
    try {
      setLoading(true);
      setSearchedPosts([]);

      if (input.trim() === "") {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/search?searchString=${encodeURIComponent(input)}`
      );

      if (!response.ok) {
        throw new Error("Lỗi xảy ra trong quá trình tìm kiếm.");
      }

      const posts: Post[] = await response.json();
      setSearchedPosts(posts);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Search className="size-5 hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className=" mx-auto w-full h-[75vh] max-w-lg flex flex-col">
          <DrawerHeader className="flex-none relative">
            <DrawerTitle>Tìm kiếm</DrawerTitle>
            <div className="mt-2 bg-accent rounded-sm flex items-center pr-3">
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm, bài viết..."
                value={searchString}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <Search className="size-4" />
            </div>
          </DrawerHeader>

          <div className="grow overflow-auto hide-scrollbar p-3">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="text-muted-foreground">Đang tải...</div>
              </div>
            ) : (
              <div className="space-y-3">
                {searchedPosts.length > 0 ? (
                  searchedPosts.map((post) => (
                    <PostCardMinimal
                      key={post.slug}
                      post={post}
                      className="border-b"
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Không tìm thấy sản phẩm, bài viết nào
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
