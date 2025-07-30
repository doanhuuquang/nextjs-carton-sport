import { ProductCategory } from "@/types/productCategory";
import { ProductSize } from "@/types/productSize";

export interface Product {
  images: string[];
  productCategory: ProductCategory;
  name: string;
  description: string;
  price: number;
  version: string[];
  colors: string[];
  productSize: ProductSize;
  slug: string;
}
