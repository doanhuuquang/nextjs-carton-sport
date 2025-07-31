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
      <div className="relative w-full aspect-square object-cover">
        <Image src={product.images[0]} alt={product.name} fill />
      </div>
      <p className="text-xs text-gray-500">{product.productCategory.name}</p>
      <p className="font-semibold line-clamp-2 min-h-10">{product.name}</p>
      <p className="font-light">{product.price} VND</p>
    </Link>
  );
}
