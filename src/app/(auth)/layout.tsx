import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full min-h-[calc(100vh-128px)] max-w-7xl m-auto px-3 py-5 gap-10">
      <div className="w-full h-full flex flex-col justify-between gap-10 bg-[url(/assets/images/about-me-hero-section-cover.svg)] max-h-[900px] rounded-xl p-3 my-auto">
        <Link
          href={"/"}
          className="w-fit rounded-full bg-black/20  text-white backdrop-blur-2xl py-2 px-5 text-xs flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Đăng nhập sau
        </Link>

        <p className="text-4xl font-bold text-gray-700 uppercase">
          Chào mừng bạn đến với Carton Sport
        </p>
      </div>
      <main className="w-full h-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
