"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const appNavLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-we" },
  { name: "Liên hệ/Tư vấn", href: "/contact-consultation" },
  { name: "Blog", href: "/blog" },
];

export default function AppNav({ className }: { className?: string }) {
  const pathName = usePathname();

  return (
    <nav className={cn("flex gap-5 uppercase", className)}>
      {appNavLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "text-sm font-bold",
            link.href === pathName
              ? "text-primary"
              : "text-muted-foreground hover:text-primary ease-in-out duration-300"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
