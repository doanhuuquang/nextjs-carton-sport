import { NextResponse } from "next/server";
import { getProductCategories } from "@/lib/sanity-utils";

export async function GET() {
  try {
    const categories = await getProductCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch categories ${error}` },
      { status: 500 }
    );
  }
}
