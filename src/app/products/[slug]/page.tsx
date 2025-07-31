// import { PostCard } from "@/components/shared/post-card";
// import Image from "next/image";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getPost, getPosts } from "@/lib/sanity-utils";
// import { PortableText } from "next-sanity";
// import { Post } from "@/types/post";
// import { PostCardMinimal } from "@/components/shared/post-card";
// import SharePost from "@/components/shared/share-post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <p>{(await params).slug}</p>;
}
