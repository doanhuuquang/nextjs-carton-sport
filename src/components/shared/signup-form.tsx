"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

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
import { User } from "@/types/user";
import { cn } from "@/lib/utils";
import bcrypt from "bcryptjs";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Vui lòng điền tên hợp lệ.",
    }),
    lastName: z.string().min(2, {
      message: "Vui lòng điền họ hợp lệ.",
    }),
    email: email("Vui lòng nhập địa chỉ email hợp lệ."),
    phone_number: z
      .string()
      .regex(phoneRegex, "Vui lòng điền số điện thoại hợp lệ.")
      .min(10, "Vui lòng điền số điện thoại hợp lệ."),
    birth_of_date: z.date("Ngày sinh không được để trống"),
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự.",
    }),
    confirm_password: z.string().min(6, {
      message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
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

export default function SignupForm() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(
    "Đăng ký tài khoản thất bại. Vui lòng thử lại sau."
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone_number: "",
      firstName: "",
      lastName: "",
      birth_of_date: new Date(),
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const newUser: User = {
      first_name: values.firstName,
      last_name: values.lastName,
      username: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: bcrypt.hashSync(values.password, process.env.AUTH_SECRET),
      birth_of_date: values.birth_of_date,
      phone_number: values.phone_number,
      created_at: new Date(),
      update_at: new Date(),
      is_active: true,
      slug: values.phone_number,
    };

    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess(true);
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
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Họ của bạn"
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
            name="firstName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tên của bạn"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
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
        </div>

        <FormField
          control={form.control}
          name="birth_of_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ngày sinh"
                  className={inputClassName}
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
                    );
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
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

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
          <Label htmlFor="terms">
            <p className="text-muted-foreground text-xs space-x-1">
              <span>
                Bằng việc nhấn vào nút Đăng ký, bạn đã chắc chắn rằng bạn đã đọc
                và đồng ý với
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
              {loading ? "Đang kiểm tra thông tin..." : "Xác nhận đăng ký"}
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
            <p className="uppercase">Đăng ký bằng tài khoản Google</p>
          </Button>
        </div>
      </form>

      <NotificationDialog
        open={open}
        setOpen={() => setOpen(false)}
        title={success ? "Thành công" : "Thất bại"}
        message={success ? "Đăng ký tài khoản thành công!" : error}
      />
    </Form>
  );
}
