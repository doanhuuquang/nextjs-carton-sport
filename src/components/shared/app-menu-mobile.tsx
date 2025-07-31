"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ModeSwitch } from "@/components/shared/mode-switch";
import { appNavLinks } from "@/components/shared/app-nav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AppLogo from "@/components/shared/app-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppMenuMobile() {
  const [open, setOpen] = React.useState(false);
  const pathName = usePathname();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Menu className="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm space-y-5">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center my-3">
              <AppLogo className="w-40" />
            </DrawerTitle>
            <DrawerDescription>
              Chào mừng bạn đến với Carton Sport
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="flex flex-col items-center justify-center gap-5">
              {appNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => open === true && setOpen(false)}
                  className={cn(
                    "font-semibold text-lg",
                    link.href === pathName
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary ease-in-out duration-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <div className="flex justify-between items-center">
              <Link href={"/shop/account"}>
                <Button variant={"outline"}>Đăng nhập</Button>
              </Link>
              <ModeSwitch />
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
