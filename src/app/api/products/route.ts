import { NextResponse } from "next/server";
import { getProducts } from "@/lib/sanity-utils";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch products ${error}` },
      { status: 500 }
    );
  }
}
