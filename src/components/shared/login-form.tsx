"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { cn } from "@/lib/utils";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  phone_number: z
    .string()
    .regex(phoneRegex, "Vui lòng điền số điện thoại hợp lệ.")
    .min(10, "Vui lòng điền số điện thoại hợp lệ."),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự.",
  }),
});

const inputClassName =
  "px-5 py-7 bg-background/60 rounded-md text-foreground border-1 w-full outline-none";

function NotificationDialog({
  open,
  setOpen,
  title,
  message,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(
    "Đăng nhập tài khoản thất bại. Vui lòng thử lại sau."
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("col-span-4 space-y-5", loading && "disable")}
      >
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Số điện thoại liên hệ"
                  {...field}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  {...field}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
          <Label htmlFor="terms">
            <p className="text-muted-foreground text-xs space-x-1">
              <span>
                Bằng việc nhấn vào nút Đăng nhập, bạn đã chắc chắn rằng bạn đã
                đọc và đồng ý với
              </span>
              <Link
                href={"/"}
                className="font-semibold text-foreground underline underline-offset-1"
              >
                Chính sách bảo mật
              </Link>
              <span>và</span>
              <Link
                href={"/"}
                className="font-semibold text-foreground underline underline-offset-1"
              >
                Điều khoản sử dụng
              </Link>
            </p>
          </Label>
        </div>

        <div className="space-y-3">
          <Button
            disabled={loading || !isChecked}
            type="submit"
            className="w-full py-5 rounded-sm bg-[#0065F8] hover:bg-[#0063f8a5] text-white hover:cursor-pointer"
          >
            <p className="uppercase">
              {loading ? "Đang kiểm tra thông tin..." : "Đăng nhập"}
            </p>
            {loading ? <LoaderCircle className="animate-spin" /> : <></>}
          </Button>

          <div className="w-full flex items-center gap-5 text-muted-foreground text-sm">
            <div className="grow bg-accent h-px"></div>
            <p>Hoặc</p>
            <div className="grow bg-accent h-px"></div>
          </div>

          <Button
            variant={"outline"}
            className="w-full py-5 rounded-sm hover:cursor-pointer flex items-center gap-3"
          >
            <Image
              src="/assets/icons/google.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            <p className="uppercase">Đăng nhập bằng tài khoản Google</p>
          </Button>
        </div>
      </form>

      <NotificationDialog
        open={open}
        setOpen={() => setOpen(false)}
        title={success ? "Thành công" : "Thất bại"}
        message={success ? "Đăng nhập thành công!" : error}
      />
    </Form>
  );
}
