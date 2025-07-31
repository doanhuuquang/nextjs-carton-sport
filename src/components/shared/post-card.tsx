"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock4 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

function PostCard({
  className,
  post,
  direction = "vertical",
}: PostCardProps & { direction?: "horizontal" | "vertical" }) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className={cn(
        " group overflow-hidden grid gap-3 h-full w-full rounded-sm ",
        className,
        direction === "horizontal" ? "grid-cols-2 grid-rows-1" : ""
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/2] w-full h-full flex-shrink-0 rounded-sm overflow-hidden transition-all duration-300",
          direction === "horizontal"
            ? "group-hover:rounded-br-none group-hover:rounded-tr-none "
            : "group-hover:rounded-br-none group-hover:rounded-bl-none "
        )}
      >
        <Image
          src={post.image || "/place-holder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 rounded-full bg-black/20 backdrop-blur-lg py-1 px-2 text-white text-[8px]">
          {post.postCategories.map((cat) => (
            <span key={cat.name} className="mr-1">
              {cat.name}
            </span>
          ))}
        </div>
        <div className="absolute top-2 right-2 rounded-full bg-black/20 backdrop-blur-lg py-1 px-2 text-white text-[8px] flex items-center gap-1">
          <Clock4 className="size-2" />
          {post.readTime} phút đọc
        </div>
      </div>

      <div className="flex-1 h-full space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase">
          <p className="line-clamp-1">{post.publishedAt.substring(0, 10)}</p>
          <span className="w-[1px] h-[11px] bg-muted-foreground rotate-30"></span>
          <p className="line-clamp-1">
            <span className="text-muted-foreground">POST BY </span>
            {post.author.name}
          </p>
        </div>
        <p className="line-clamp-2 font-bold min-h-12">{post.title}</p>
        {direction === "horizontal" && (
          <p className="text-xs line-clamp-2 text-foreground/80 min-h-[33px]">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

function PostCardCompact({ className, post }: PostCardProps) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className={cn(
        "group overflow-hidden grid grid-cols-3 h-full items-center gap-3 w-full rounded-sm  ",
        className
      )}
    >
      <div className="relative col-span-1 aspect-[4/3] h-full w-full flex-shrink-0 rounded-sm group-hover:rounded-br-none group-hover:rounded-tr-none transition-all duration-300 overflow-hidden">
        <Image
          src={post.image || "/place-holder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="col-span-2 space-y-1 h-full">
        <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase">
          <p className="line-clamp-1">{post.publishedAt.substring(0, 10)}</p>
          <span className="w-[1px] h-[10px] bg-muted-foreground rotate-30"></span>
          <p className="line-clamp-1">{post.author.name}</p>
        </div>
        <p className="line-clamp-2 text-sm font-bold min-h-10">{post.title}</p>
      </div>
    </Link>
  );
}

function PostCardFeatured({
  post,
  className,
  isCarouselItem,
}: PostCardProps & { isCarouselItem?: boolean }) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className={cn(
        "group overflow-hidden grid gap-3 h-full min-h-[250px] w-full rounded-sm ",
        className,
        isCarouselItem ? "relative" : "grid-rows-2"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden row-span-1 aspect-[4/2] w-full h-full flex-shrink-0 rounded-sm transition-all duration-300 ",
          !isCarouselItem &&
            "group-hover:rounded-br-none group-hover:rounded-bl-none"
        )}
      >
        <Image
          src={post.image || "/place-holder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        {isCarouselItem && (
          <div className="w-full h-full absolute top-0 left-0 bg-black/30"></div>
        )}
        <div
          className={cn(
            "absolute rounded-full bg-black/20 backdrop-blur-lg  text-white  flex items-center gap-1",
            isCarouselItem
              ? " lg:text-xs text-[8px] lg:py-2 lg:px-4 py-1 px-2 lg:top-4 top-2 lg:left-4 left-2"
              : " text-[8px] py-1 px-2 top-2 left-2"
          )}
        >
          {post.postCategories.map((cat) => (
            <span key={cat.name} className="mr-1">
              {cat.name}
            </span>
          ))}
        </div>
        <div
          className={cn(
            "absolute rounded-full bg-black/20 backdrop-blur-lg  text-white  flex items-center gap-1",
            isCarouselItem
              ? " lg:text-xs text-[8px] lg:py-2 lg:px-4 py-1 px-2 lg:top-4 top-2 lg:right-4 right-2"
              : " text-[8px] py-1 px-2 top-2 right-2"
          )}
        >
          <Clock4 className={isCarouselItem ? "lg:size-4 size-2" : "size-2"} />
          {post.readTime} phút đọc
        </div>
      </div>
      <div
        className={cn(
          "flex-1 space-y-5",
          isCarouselItem &&
            "absolute w-full lg:max-w-1/2 bottom-0 left-0 bg-gradient-to-t text-white"
        )}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs uppercase">
            <p className="line-clamp-1">{post.publishedAt.substring(0, 10)}</p>
            <span className="w-[1px] h-[11px] bg-muted-foreground rotate-30"></span>
            <p className="line-clamp-1 flex gap-1">
              <span
                className={
                  isCarouselItem ? "text-white/80" : "text-muted-foreground"
                }
              >
                POST BY
              </span>
              {post.author.name}
            </p>
          </div>
        </div>

        <p className="line-clamp-2 lg:text-2xl md:text-xl font-bold min-h-12">
          {post.title}
        </p>
        <p
          className={cn(
            "text-sm line-clamp-2 min-h-8",
            isCarouselItem ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {post.excerpt}
        </p>
        <p
          className={cn(
            "underline underline-offset-2 text-sm",
            isCarouselItem && "hidden"
          )}
        >
          Đọc thêm
        </p>
      </div>
    </Link>
  );
}

function PostCardMinimal({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className={cn(
        "group overflow-hidden grid gap-3 h-full w-full rounded-sm ",
        className
      )}
    >
      <div className="flex-1 h-full space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase">
          <p className="line-clamp-1">{post.publishedAt.substring(0, 10)}</p>
          <span className="w-[1px] h-[11px] bg-muted-foreground rotate-30"></span>
          <p className="line-clamp-1">
            <span className="text-muted-foreground">POST BY </span>
            {post.author.name}
          </p>
        </div>
        <p className="line-clamp-2 font-bold min-h-12">{post.title}</p>
      </div>
    </Link>
  );
}

export { PostCard, PostCardCompact, PostCardFeatured, PostCardMinimal };
