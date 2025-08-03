import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import userModel from "@/models/userModel";
// { params }: { params: { id: string } }
export async function GET() {
  try {
    await connectDB();
    const users = await userModel.find();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users ${error}` },
      { status: 500 }
    );
  }
}
