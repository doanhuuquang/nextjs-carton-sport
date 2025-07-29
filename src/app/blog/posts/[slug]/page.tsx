import { PostCard } from "@/components/shared/post-card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPost, getPosts } from "@/lib/sanity-utils";
import { PortableText } from "next-sanity";
import { Post } from "@/types/post";
import { PostCardMinimal } from "@/components/shared/post-card";
import SharePost from "@/components/shared/share-post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const relatestPosts = await getPosts();
  const post: Post | null = await getPost((await params).slug);

  if (post == null) return null;

  return (
    <div className="mx-auto max-w-7xl px-3 py-10 space-y-15">
      <main className="space-y-20">
        <div className="w-full overflow-hidden rounded-md grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex items-center">
            <div className=" space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase">
                {post.category.map((cat) => (
                  <p key={cat.name} className="px-4 py-1 bg-muted rounded-full">
                    {cat.name}
                  </p>
                ))}
                <div className="flex gap-2">
                  <p className="line-clamp-1">
                    {post.publishedAt.substring(0, 10)}
                  </p>
                  <span className="w-[1px] h-[11px] bg-muted-foreground rotate-30"></span>
                  <p className="line-clamp-1 flex gap-1">
                    <span className="text-muted-foreground">POST BY</span>
                    {post.author.name}
                  </p>
                </div>
              </div>

              <p className="text-3xl font-bold">{post.title}</p>

              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {post.author.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <p className="line-clamp-1 flex gap-1 text-sm uppercase">
                  <span className="text-muted-foreground">POST BY</span>
                  {post.author.name}
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/2] w-full h-full ">
            <Image
              src={post.image || "/place-holder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-md"
            />{" "}
          </div>
        </div>
        <div className="grid lg:grid-cols-7 gap-10">
          <div className="prose prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground mx-auto lg:col-span-4 col-span-7 lg:order-2 order-first">
            <p>{post.excerpt}</p>
            {Array.isArray(post.content) && (
              <PortableText value={post.content} />
            )}
          </div>
          <div className="lg:sticky lg:top-24 h-fit lg:col-span-1 col-span-7 lg:order-first order-2">
            <div className="space-y-4">
              <SharePost postTitle={post.title} />
            </div>
          </div>
          <div className="lg:sticky lg:flex lg:flex-col lg:items-end lg:top-24 lg:col-span-2 col-span-7 h-fit order-3">
            <div className="space-y-5">
              <p className="font-semibold">Bài viết mới nhất</p>
              {relatestPosts.slice(0, 5).map((relatePost) => (
                <PostCardMinimal
                  key={relatePost.slug}
                  post={relatePost}
                  className="bg-accent"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="space-y-5 mt-10">
        <p className="text-2xl font-semibold">Bài viết mới nhất</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
          {relatestPosts.slice(0, 4).map((relatePost) => (
            <PostCard key={relatePost.slug} post={relatePost} />
          ))}
        </div>
      </div>
    </div>
  );
}
