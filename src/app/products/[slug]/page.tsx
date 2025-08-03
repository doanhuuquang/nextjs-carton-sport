"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import convertMoney from "@/lib/convert-money";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { set } from "mongoose";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = React.useState<string>(
    "Đăng nhập tài khoản thất bại. Vui lòng thử lại sau."
  );
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [currentColor, setCurrentColor] = useState<string>(
    product?.colors[0] || ""
  );
  const [currentVersion, setCurrentVersion] = useState<string>(
    product?.version[0] || ""
  );
  const [currentSize, setCurrentSize] = useState<string>(
    product?.productSize.sizes[0] || ""
  );
  const [currentQuantity, setQuantity] = React.useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const slug = (await params).slug;

        const res = await fetch("/api/products/" + slug, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setSuccess(false);
          setError(data.error || "Sản phẩm không tồn tại");
          return;
        }

        setSuccess(true);
        setProduct(data);
        setCurrentColor(data.colors[0]);
        setCurrentVersion(data.version[0]);
        setCurrentSize(data.productSize.sizes[0]);
      } catch {
        setSuccess(false);
        setError("Có lỗi xảy ra, vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!success || !product) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl  mx-auto px-3 py-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 ">
          <ProductImages product={product} />
          <div className="w-full h-full space-y-10">
            <div className="w-full space-y-3">
              <p className="text-sm">{product.productCategory.name}</p>
              <p className="text-2xl font-semibold">{product.name}</p>
              <p className="text-2xl">{convertMoney(product.price)}</p>

              <div className="flex items-center gap-3 text-sm">
                <p className="text-muted-foreground">Phiên bản:</p>
                {product.version.map((version, index) => (
                  <Button
                    className="rounded-full"
                    variant={version === currentVersion ? "outline" : "ghost"}
                    onClick={() => setCurrentVersion(version)}
                    key={index}
                    size={"sm"}
                  >
                    {version}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm">
                <p className="text-muted-foreground">Kích cỡ:</p>
                {product.productSize.sizes.map((size, index) => (
                  <Button
                    className="rounded-full"
                    variant={size === currentSize ? "outline" : "ghost"}
                    onClick={() => setCurrentSize(size)}
                    key={index}
                    size={"sm"}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <p className="text-muted-foreground">Màu sắc:</p>
                {product.colors.map((color, index) => (
                  <Button
                    className="rounded-full"
                    variant={color === currentColor ? "outline" : "ghost"}
                    onClick={() => setCurrentColor(color)}
                    key={index}
                    size={"sm"}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex items-center rounded-full overflow-hidden border">
                <Button
                  disabled={currentQuantity <= 1}
                  variant={"ghost"}
                  className="hover:bg-transparent"
                  onClick={() =>
                    currentQuantity > 1 && setQuantity(currentQuantity - 1)
                  }
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Input
                  type="number"
                  className="w-10 text-lg text-center bg-transparent"
                  value={currentQuantity}
                  disabled
                />
                <Button
                  variant={"ghost"}
                  className="hover:bg-transparent"
                  onClick={() => setQuantity(currentQuantity + 1)}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
              <Button className="grow rounded-full py-7 font-semibold">
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className="prose prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground mx-auto lg:col-span-4 col-span-7 lg:order-2 order-first">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductImages({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const images: string[] = product.images.concat(product.productSize.sizeGuide);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square">
        <Image
          src={images[currentImageIndex]}
          alt={product.name}
          fill
          quality={100}
          className="rounded-2xl"
        />
        <Button
          className="absolute top-1/2 -translate-y-1/2 left-3 z-10 bg-black/20 text-white rounded-full w-10 h-10"
          variant="ghost"
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === 0
                ? images.length - 1
                : currentImageIndex - 1
            )
          }
        >
          <ArrowLeft />
        </Button>

        <Button
          className="absolute top-1/2 -translate-y-1/2 right-3 z-10 bg-black/20 text-white rounded-full w-10 h-10"
          variant="ghost"
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === images.length - 1
                ? 0
                : currentImageIndex + 1
            )
          }
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="flex gap-3 mt-3 pr-3 overflow-auto hide-scrollbar ">
        {images.map((image: string, index: number) => {
          return (
            <Image
              key={index}
              alt={product.name}
              src={image}
              width={100}
              height={100}
              quality={100}
              onClick={() => setCurrentImageIndex(index)}
              className={
                index === currentImageIndex
                  ? "border-2 border-primary rounded-lg"
                  : "rounded-lg"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
