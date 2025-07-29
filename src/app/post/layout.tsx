import { PostCard } from "@/components/shared/post-card";
import { getPosts } from "@/lib/sanity-utils";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const relatestPosts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-3 py-10 space-y-15">
      {children}
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
