import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { Post } from "@/types/post";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  BLOG_OWNER_INFO_QUERY,
  CAROUSEL_QUERY,
  CATEGORY_QUERY,
  COMPACT_POST_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  RECOMMEND_POST_QUERY,
  SEARCH_QUERY,
  SOCIAL_MEDIA_QUERY,
} from "./sanity-queries";
import { Category } from "@/types/category";
import { SocialMedia } from "@/types/social-media";
import { BlogOwnerInfo } from "@/types/blog-owner-info";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export function transformPost(doc: SanityDocument): Post {
  return {
    title: doc.title || "",
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    author: {
      name: doc.author?.name || "",
      avatar: doc.author?.avatar ? urlFor(doc.author.avatar)?.url() || "" : "",
    },
    publishedAt: doc.publishedAt || "",
    readTime: doc.readTime || 0,
    category: doc.category || [],
    image: doc.image ? urlFor(doc.image)?.url() || "" : "",
    slug: doc.slug?.current || doc.slug || "",
  };
}

export function transformSocialMedia(doc: SanityDocument): SocialMedia {
  return {
    platform: doc.platform || "",
    url: doc.url || "",
    icon: doc.icon ? urlFor(doc.icon)?.url() || "" : "",
  };
}

export function transformCategory(doc: SanityDocument): Category {
  return {
    name: doc.name || "",
    description: doc.description || "",
  };
}

export function transformBlogOwnerInfo(doc: SanityDocument): BlogOwnerInfo {
  return {
    logo: doc.logo ? urlFor(doc.logo)?.url() || "" : "",
    avatar: doc.avatar ? urlFor(doc.avatar)?.url() || "" : "",
    name: doc.name || "",
    email: doc.email || "",
    address: doc.address || "",
    phone: doc.phone || "",
    introduction: doc.introduction || "",
    bio: doc.bio || "",
  };
}

///////////////////////////////////////////////////////////////////////////////////

export async function getPosts(): Promise<Post[]> {
  const sanityPosts: SanityDocument[] = await client.fetch(
    POSTS_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return sanityPosts.map(transformPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  const post: SanityDocument = await client.fetch(
    POST_QUERY,
    { slug },
    {
      next: { revalidate: 30 },
    }
  );
  return transformPost(post);
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  const sanityPosts: SanityDocument[] = await client.fetch(
    `*[
      _type == "post"
      && defined(slug.current)
      && $categoryId in category[]._ref
    ]|order(publishedAt desc){
      _id,
      title,
      excerpt,
      slug,
      publishedAt,
      readTime,
      image,
      author->{
        name
      },
      category[]->{
        name,
        description
      }
    }`,
    { categoryId },
    { next: { revalidate: 30 } }
  );
  return sanityPosts.map(transformPost);
}

export async function getCompactPosts(): Promise<Post[]> {
  const compactPosts: SanityDocument[] = await client.fetch(
    COMPACT_POST_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );

  return compactPosts.flatMap((doc) => doc.posts.map(transformPost));
}

export async function getRecommendPosts(): Promise<Post[]> {
  const compactPosts: SanityDocument[] = await client.fetch(
    RECOMMEND_POST_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );

  return compactPosts.flatMap((doc) => doc.posts.map(transformPost));
}

export async function getCarouselPosts(): Promise<Post[]> {
  const carouselPosts: SanityDocument[] = await client.fetch(
    CAROUSEL_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );

  return carouselPosts.flatMap((doc) => doc.posts.map(transformPost));
}

export async function searchPosts(searchString: string): Promise<Post[]> {
  const searchedPosts: SanityDocument[] = await client.fetch(
    SEARCH_QUERY,
    { searchString },
    {
      next: { revalidate: 30 },
    }
  );

  return searchedPosts.map(transformPost);
}

export async function getCategories(): Promise<Category[]> {
  const sanityCategories: SanityDocument[] = await client.fetch(
    CATEGORY_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );

  return sanityCategories.map(transformCategory);
}

export async function getBlogOwnerInfo(): Promise<BlogOwnerInfo> {
  const blogOwnerInfoSanity: SanityDocument = await client.fetch(
    BLOG_OWNER_INFO_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return transformBlogOwnerInfo(blogOwnerInfoSanity);
}

export async function getSocialMedias(): Promise<SocialMedia[]> {
  const sanitySocialMedias: SanityDocument[] = await client.fetch(
    SOCIAL_MEDIA_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return sanitySocialMedias.map(transformSocialMedia);
}
