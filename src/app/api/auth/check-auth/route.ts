import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import connectDB from "@/config/database";
import userModel from "@/models/userModel";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userID = payload.userID as string;

    await connectDB();
    const user = await userModel.findById(userID).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        birth_of_date: user.birth_of_date,
        created_at: user.created_at,
        update_at: user.update_at,
        is_active: user.is_active,
        slug: user.slug,
      },
    });
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
