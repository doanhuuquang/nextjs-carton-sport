import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { Post } from "@/types/post";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  BLOG_OWNER_INFO_QUERY,
  POST_CAROUSEL_QUERY,
  POST_CATEGORY_QUERY,
  COMPACT_POST_QUERY,
  POSTS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POST_QUERY,
  PRODUCTS_QUERY,
  RECOMMEND_POST_QUERY,
  SEARCH_QUERY,
  SHOP_INFO_QUERY,
  SOCIAL_MEDIA_QUERY,
  PRODUCT_CATEGORY_QUERY,
  PRODUCT_QUERY,
} from "./sanity-queries";
import { PostCategory } from "@/types/postCategory";
import { SocialMedia } from "@/types/social-media";
import { BlogOwnerInfo } from "@/types/blog-owner-info";
import { ShopInfo } from "@/types/shop-info";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";

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
    postCategories: doc.postCategories || [],
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

export function transformPostCategory(doc: SanityDocument): PostCategory {
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

export function transformShopInfo(doc: SanityDocument): ShopInfo {
  return {
    logo: doc.logo ? urlFor(doc.logo)?.url() || "" : "",
    logoDark: doc.logoDark ? urlFor(doc.logoDark)?.url() || "" : "",
    name: doc.name || "",
    email: doc.email || "",
    address: doc.address || "",
    phone: doc.phone || "",
    introduction: doc.introduction || "",
  };
}

export function transformProductCategory(doc: SanityDocument): ProductCategory {
  return {
    name: doc.name || "",
    description: doc.description || "",
  };
}

export function transformProduct(doc: SanityDocument): Product {
  return {
    images: doc.images
      ? doc.images.map((image: string) => {
          const imageUrl = image ? urlFor(image) : null;
          return imageUrl ? imageUrl.url() : "";
        })
      : [],
    productCategory: doc.productCategory || { name: "", description: "" },
    name: doc.name || "",
    description: doc.description || "",
    price: doc.price || 0,
    version: doc.version || [],
    colors: doc.colors || [],
    productSize: {
      sizeGuide:
        doc.productSize?.sizeGuide?.map((image: string) => {
          const imageUrl = image ? urlFor(image) : null;
          return imageUrl ? imageUrl.url() : "";
        }) || [],
      sizes: doc.productSize?.sizes || [],
    },
    slug: doc.slug?.current || doc.slug || "",
  };
}

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
    POST_CAROUSEL_QUERY,
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

export async function getPostCategories(): Promise<PostCategory[]> {
  const sanityPostCategories: SanityDocument[] = await client.fetch(
    POST_CATEGORY_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );

  return sanityPostCategories.map(transformPostCategory);
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  const sanityPosts: SanityDocument[] = await client.fetch(
    POSTS_BY_CATEGORY_QUERY,
    { categoryId },
    {
      next: { revalidate: 30 },
    }
  );
  return sanityPosts.map(transformPost);
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

export async function getShopInfo(): Promise<ShopInfo> {
  const shopInfoSanity: SanityDocument = await client.fetch(
    SHOP_INFO_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return transformShopInfo(shopInfoSanity);
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

export async function getProductCategories(): Promise<ProductCategory[]> {
  const sanityProductCategories: SanityDocument[] = await client.fetch(
    PRODUCT_CATEGORY_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return sanityProductCategories.map(transformProductCategory);
}

export async function getProducts(): Promise<Product[]> {
  const sanityProducts: SanityDocument[] = await client.fetch(
    PRODUCTS_QUERY,
    {},
    {
      next: { revalidate: 30 },
    }
  );
  return sanityProducts.map(transformProduct);
}

export async function getProduct(slug: string): Promise<Product> {
  const sanityProduct: SanityDocument = await client.fetch(
    PRODUCT_QUERY,
    {
      slug,
    },
    { next: { revalidate: 30 } }
  );
  return transformProduct(sanityProduct);
}
