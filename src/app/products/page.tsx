import { getProducts } from "@/lib/sanity-utils";
import { Product } from "@/types/product";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-center">
        {products.map((product) => (
          <div key={product.slug}>
            <p>{product.name}</p>
            <p>{product.colors}</p>
            {Array.isArray(product.description) && (
              <PortableText value={product.description} />
            )}
            <p>{product.price}</p>
            <p>{product.version}</p>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
            />

            <Image
              src={product.productSize.sizeGuide[0]}
              alt={product.name}
              width={500}
              height={500}
            />
            <p>{product.slug}</p>
          </div>
        ))}
      </h1>
    </div>
  );
}
