import ProductCardInCart from "@/components/shared/product-card-in-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { getProducts } from "@/lib/sanity-utils";
import { CreditCard, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function AppCart() {
  const products = await getProducts();

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingBag className="size-6 hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="w-[100vw] max-w-xl">
        <SheetHeader className="border-b">
          <SheetTitle className="text-2xl">Giỏ hàng</SheetTitle>
          <SheetDescription>{products.length} sản phẩm</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-3 py-5 overflow-auto hide-scrollbar">
          {products.map((product) => (
            <div key={product.slug}>
              <ProductCardInCart
                productDAO={{
                  slug: product.slug,
                  name: product.name,
                  image: product.images[0],
                  version: product.version[0],
                  color: product.colors[0],
                  size: product.productSize.sizes[0],
                  price: product.price,
                }}
              />
              {products.indexOf(product) !== products.length - 1 && (
                <Separator orientation="horizontal" className="my-5" />
              )}
            </div>
          ))}
        </div>
        <SheetFooter className="gap-5 bg-accent/50">
          <div className="grid grid-cols-2 gap-5">
            <Link
              className="lg:text-sm md:text-sm text-xs italic"
              href={"/shop/checkout"}
            >
              Đã bao gồm thuế. Phí vận chuyển được tính khi thanh toán.
            </Link>
            <div className="text-end">
              <p>Tổng phụ</p>
              <p className="lg:text-2xl text-lg font-bold">6.805.000 VND</p>
            </div>
          </div>
          <div className="w-full flex gap-3">
            <Button className="grow py-7">
              Thanh toán <CreditCard />
            </Button>
            <Button className="grow py-7" variant={"outline"}>
              Xem giỏ hàng
              <ShoppingCart />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
