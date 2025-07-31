"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { icons } from "lucide-react";

const topBarLinks = [
  {
    href: "/shop/products",
    label: "Đa năng - Dễ dàng sử dụng",
    icons: <icons.Check className="size-4" />,
  },
  {
    href: "/shop/products",
    label: "Miễn phí vận chuyển",
    icons: <icons.PackageCheck className="size-4" />,
  },
  {
    href: "/shop/products",
    label: "Carton Sport Easy - Đổi trả dễ dàng",
    icons: <icons.Undo2 className="size-4" />,
  },
];

export default function AppTopbar() {
  const [currentLink, setCurrentLink] = useState(topBarLinks[0]);
  const [currentClassName, setCurrentClassName] = useState("show-topbar-label");

  useEffect(() => {
    setTimeout(() => {
      setCurrentClassName("hide-topbar-label");
    }, 3000);

    setTimeout(() => {
      const nextIndex =
        (topBarLinks.indexOf(currentLink) + 1) % topBarLinks.length;
      setCurrentLink(topBarLinks[nextIndex]);
      setCurrentClassName("show-topbar-label");
    }, 3500);
  }, [currentLink]);

  return (
    <div className="w-full bg-primary h-12 flex items-center text-primary-foreground">
      <div className="w-full max-w-7xl px-3 m-auto flex items-center justify-center  transition-all duration-300">
        <Link
          href={currentLink.href}
          className="flex items-center justify-center gap-2 w-full overflow-hidden"
        >
          <p
            className={cn(
              "w-fit text-ellipsis whitespace-nowrap truncate text-sm flex items-center gap-2",
              currentClassName
            )}
          >
            <span>{currentLink.icons}</span>
            {currentLink.label}
          </p>
          {/* <ArrowUpRight className="size-4" /> */}
        </Link>
      </div>
    </div>
  );
}
