import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ className, product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn("w-full h-full space-y-3 cursor-pointer", className)}
    >
      <div className="relative w-full aspect-4/3 object-cover object-center">
        <Image src={product.images[0]} alt={product.name} fill />
      </div>

      <p className="font-semibold text-sm line-clamp-3 min-h-[60px]">
        {product.name}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{product.productCategory.name}</p>
        <p className="font-bold">{product.price}đ</p>
      </div>
    </Link>
  );
}
