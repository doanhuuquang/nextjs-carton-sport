import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import userModel from "@/models/userModel";
import { User } from "@/types/user";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user: User = await req.json();

    const existingUsers = await userModel.find({
      phone_number: user.phone_number,
    });
    if (existingUsers.length > 0) {
      return NextResponse.json(
        {
          error:
            "Số điện thoại đã được sử dụng trước đó rồi! Vui lòng sử dụng số điện thoại khác để đăng ký.",
        },
        { status: 409 }
      );
    }

    const newUser = await userModel.create(user);
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Đăng ký tài khoản thất bại! Nếu bạn nghĩ là do hệ thống, xin vui lòng liên hệ với chúng tôi để được hỗ trợ",
      },
      { status: 500 }
    );
  }
}
