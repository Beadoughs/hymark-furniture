import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductPageData } from "@/lib/products";
import { ProductView } from "@/components/pages/product-view";

export const revalidate = 60;

type ProductRouteProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { handle } = await params;
  const pageData = await getProductPageData(handle);

  if (!pageData) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const { product } = pageData;

  return {
    title: product.title,
    description:
      product.description ||
      `Shop ${product.title} at Hymark Furniture Tasmania.`,
    openGraph: {
      title: product.title,
      images: [{ url: product.image, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }: ProductRouteProps) {
  const { handle } = await params;
  const pageData = await getProductPageData(handle);

  if (!pageData) {
    notFound();
  }

  const { product, shopifyConnected } = pageData;

  return (
    <ProductView product={product} shopifyConnected={shopifyConnected} />
  );
}
