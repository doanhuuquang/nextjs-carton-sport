import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Secret key for JWT (should match middleware)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  try {
    await connectDB();
    const { phone_number, password } = await req.json();

    const user = await userModel.findOne({ phone_number: phone_number });
    if (!user) {
      return NextResponse.json(
        {
          error: "Tài khoản này không tồn tại.",
        },
        {
          status: 401,
        }
      );
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          error: "Mật khẩu không đúng. Vui lòng thử lại.",
        },
        {
          status: 401,
        }
      );
    }

    const userID = user._id.toString();

    const token = await new SignJWT({ userID: userID })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ status: 200 });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 ngày
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error:
          "Đăng nhập tài khoản thất bại! Nếu bạn nghĩ là do hệ thống, xin vui lòng liên hệ với chúng tôi để được hỗ trợ",
      },
      { status: 500 }
    );
  }
}
