import { Author } from "@/types/author";
import { Category } from "@/types/category";

export interface Post {
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  category: Category[];
  image: string;
  slug: string;
}
