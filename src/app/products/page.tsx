"use client";

import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("Tất cả");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products-categories")
      .then((res) => res.json())
      .then((data) => {
        const updatedCategories = [
          { name: "Tất cả", description: "" },
          ...data,
        ];
        setCategories(updatedCategories);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="space-y-5 py-5 w-full">
      <div className="flex gap-3 overflow-auto max-w-7xl  mx-auto px-3 hide-scrollbar">
        {loading ? (
          <>
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <Skeleton className="h-[50px] w-full rounded-sm" />
          </>
        ) : (
          categories.map((category) => (
            <Button
              variant={
                currentCategory === category.name ? "default" : "outline"
              }
              key={category.name}
              onClick={() => setCurrentCategory(category.name)}
            >
              {category.name}
            </Button>
          ))
        )}
      </div>

      <div className="w-full px-3 max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid-flow-row gap-5">
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          products.map((product) =>
            currentCategory === "Tất cả" ? (
              <ProductCard key={product.slug} product={product} />
            ) : (
              product.productCategory.name === currentCategory && (
                <ProductCard key={product.slug} product={product} />
              )
            )
          )
        )}
      </div>
      <div className="flex justify-center items-center w-full gap-1">
        <div className="h-[1px] w-3 bg-muted-foreground/30"></div>
        <p className="text-muted-foreground/30 text-sm">Đã xem hết</p>
        <div className="h-[1px] w-3 bg-muted-foreground/30"></div>
      </div>
    </main>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="group overflow-hidden grid gap-3 h-full min-h-[250px] w-full rounded-sm">
      <div className="relative overflow-hidden row-span-1 aspect-[4/2] w-full h-full flex-shrink-0 rounded-sm transition-all duration-300">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 space-y-5">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[15px] w-[80%]" />
      </div>
    </div>
  );
}
