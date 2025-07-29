import { NextResponse } from "next/server";
import { getCategories } from "@/lib/sanity-utils";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch categories ${error}` },
      { status: 500 }
    );
  }
}
