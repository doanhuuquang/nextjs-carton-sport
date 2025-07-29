import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AppLogo({ className }: { className?: string }) {
  return (
    <Link href={"/shop"} className={cn("w-fit")}>
      <div className={cn("relative h-10", className)}>
        <Image
          alt="Carton Sport"
          src={"/assets/logos/shop/logo-carton-sport.svg"}
          fill
          className="absolute dark:hidden block"
        />
        <Image
          alt="Carton Sport"
          src={"/assets/logos/shop/logo-dark-carton-sport.svg"}
          fill
          className="absolute dark:block hidden"
        />
      </div>
    </Link>
  );
}
