"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { Check, Copy, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SharePost({ postTitle }: { postTitle: string }) {
  const path = `https://blog-doanhuuquang.vercel.app${usePathname()}`;

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 cursor-pointer text-blue-600">
        Chia sẻ bài viết <Link className="size-4 " />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chia sẻ bài viết cho bạn bè</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input defaultValue={path} />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              navigator.clipboard.writeText(path);
              toast("Đã sao chép đường dẫn vào bộ nhớ tạm", {
                description: postTitle.substring(0, 39) + "...",
                action: {
                  label: "Ẩn",
                  onClick: () => console.log("Undo"),
                },
                position: "top-center",
                icon: <Check className="size-4" />,
              });
            }}
          >
            Sao chép đường dẫn <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
