import LoginForm from "@/components/shared/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="space-y-10 h-full lg:max-h-[900px] w-full">
      <div className="space-y-3">
        <p className="text-4xl font-bold">Chào mừng bạn quay trở lại</p>
        <p className="text-sm">
          Bạn chưa có tài khoản?
          <span>
            <Link
              href={"/signup"}
              className="text-primary underline underline-offset-2 ml-2"
            >
              Đăng ký ngay
            </Link>
          </span>
        </p>
      </div>

      <LoginForm />
    </main>
  );
}
