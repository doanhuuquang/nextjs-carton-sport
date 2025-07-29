import { NextResponse } from "next/server";
import { getRecommendPosts } from "@/lib/sanity-utils";

export async function GET() {
  try {
    const posts = await getRecommendPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching recommend posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommend posts" },
      { status: 500 }
    );
  }
}
