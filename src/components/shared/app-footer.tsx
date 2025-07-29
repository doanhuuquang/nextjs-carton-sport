import AppLogo from "@/components/shared/app-logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SubscribeForm from "@/components/shared/subscribe-form";
import { getCategories } from "@/lib/sanity-utils";
import { Category } from "@/types/category";
import SocialLinks from "@/components/shared/social-links";

export const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-we" },
  { name: "Liên hệ/Tư vấn", href: "/contact-consultation" },
  { name: "Blog", href: "/blog" },
];

export default async function AppFooter() {
  const categories: Category[] = await getCategories();

  return (
    <div className="w-full bg-background border-t">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-3 grid-cols-1">
        <div className="space-y-5 px-3 py-5">
          <AppLogo className="w-40" />
          <p className="text-sm text-muted-foreground">
            Viết là cách mình hiểu thế giới, còn đọc là cách bạn lắng nghe tâm
            hồn. Chào mừng bạn đến với góc nhỏ của mình – nơi những câu chuyện
            bắt đầu.
          </p>
          <SocialLinks />
        </div>

        <Separator orientation="horizontal" className="lg:hidden block" />

        <div className="grid grid-cols-2 text-sm px-3 py-5 lg:border-x ">
          <div className="space-y-3">
            <p className="font-semibold">Liên kết nhanh</p>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-end">
            <p className="font-semibold">Danh mục Blog</p>
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Link
                  href={"/"}
                  key={category.name}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" className="lg:hidden block" />

        <div className="px-3 py-5 space-y-5">
          <p className="text-sm font-semibold">
            Đăng ký nhận các thông báo mới nhất của Carton Sport!
          </p>
          <SubscribeForm />
        </div>
      </div>

      <Separator orientation="horizontal" />

      <div className="w-full max-w-7xl mx-auto px-3 py-5 flex flex-wrap items-center justify-between text-muted-foreground text-xs gap-2">
        <p>Copyright © 2025. Toàn bộ bản quyền thuộc Quang Blog</p>
        <div className="flex items-center gap-2">
          <Link href={"/"}>Điều khoản dịch vụ</Link>
          <div className="w-[1px] h-3 bg-muted-foreground"></div>
          <Link href={"/"}>Chính sách bảo mật</Link>
        </div>
      </div>
    </div>
  );
}
