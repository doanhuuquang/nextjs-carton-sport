import { Author } from "@/types/author";
import { PostCategory } from "@/types/postCategory";

export interface Post {
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  postCategories: PostCategory[];
  image: string;
  slug: string;
}
