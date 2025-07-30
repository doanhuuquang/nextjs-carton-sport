import { ProductSize } from "@/types/productSize";

export interface Product {
  images: string[];
  name: string;
  description: string;
  price: number;
  version: string[];
  colors: string[];
  productSize: ProductSize;
  slug: string;
}
