import { getProduct } from "@/lib/sanity-utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const product = await getProduct(slug);

    if (!product) {
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại." },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
