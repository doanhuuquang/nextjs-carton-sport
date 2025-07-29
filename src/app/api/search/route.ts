import { searchPosts } from "@/lib/sanity-utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchString = searchParams.get("searchString");
    const posts = await searchPosts(searchString || "");

    return NextResponse.json(posts);
  } catch (error) {
    throw new Error("Tìm kiếm không thành công. Lỗi: " + error);
  }
}
