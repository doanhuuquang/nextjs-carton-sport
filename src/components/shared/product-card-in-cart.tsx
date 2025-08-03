"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import convertMoney from "@/lib/convert-money";
import { cn } from "@/lib/utils";
import { ProductDAO } from "@/types/DAOs/productDAO";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface productCardInCartProps {
  className?: string;
  productDAO: ProductDAO;
}

export default function ProductCardInCart({
  className,
  productDAO,
}: productCardInCartProps) {
  const [currentQuantity, setQuantity] = React.useState<number>(1);

  return (
    <div className={cn("w-full grid grid-cols-4 gap-3", className)}>
      <div className="relative col-span-1 aspect-square object-cover">
        <Image src={productDAO.image} alt={productDAO.name} fill />
      </div>
      <div className="w-full col-span-3 flex flex-col justify-between">
        <Link
          href={`/products/${productDAO.slug}`}
          className="flex gap-3 cursor-pointer"
        >
          <div className="w-full space-y-1">
            <p className="line-clamp-2 font-semibold text-sm min-h-10">
              {productDAO.name}
            </p>

            <div className="flex gap-3">
              {productDAO.version && (
                <p className="text-xs text-muted-foreground">
                  {productDAO.version}
                </p>
              )}
              {productDAO.color && (
                <p className="text-xs text-muted-foreground">
                  {productDAO.color}
                </p>
              )}

              {productDAO.size && (
                <p className="text-xs text-muted-foreground">
                  {productDAO.size}
                </p>
              )}
            </div>
            <p className="text-sm">{convertMoney(productDAO.price)}</p>
          </div>
        </Link>

        <div className="flex justify-between items-end lg:mt-0 mt-3">
          <div className="flex items-center border-y h-7 overflow-hidden bg-accent">
            <Button
              disabled={currentQuantity <= 1}
              variant={"outline"}
              className="!p-1"
              onClick={() =>
                currentQuantity > 1 && setQuantity(currentQuantity - 1)
              }
            >
              <Minus className="size-3" />
            </Button>

            <Input
              type="number"
              className="w-8"
              value={currentQuantity}
              disabled
            />

            <Button
              variant={"outline"}
              className="!p-1"
              onClick={() => setQuantity(currentQuantity + 1)}
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <Button variant={"ghost"}>Xóa</Button>
        </div>
      </div>
    </div>
  );
}
