"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const formSchema = z.object({
  email: z.email("Vui lòng điền E-mail hợp lệ."),
});

export default function SubscribeForm() {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    {...field}
                    className="rounded-full bg-transparent dark:bg-accent border p-6 pr-16"
                  />
                </FormControl>
                <Button
                  disabled={!isChecked}
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-1.5 p-0 w-10 h-10 rounded-full bg-black hover:bg-black/80"
                >
                  <Image
                    src="/assets/icons/paper-airplane.svg"
                    alt="paper-airplane"
                    width={15}
                    height={15}
                  />
                </Button>
              </div>
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
      </form>
    </Form>
  );
}
