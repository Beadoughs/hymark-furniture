import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/lib/collections";
import { getCollectionPageData } from "@/lib/products";
import { CollectionView } from "@/components/pages/collection-view";

export const revalidate = 60;

type CollectionRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCollectionPageData(slug);

  if (!pageData) {
    return {
      title: "Collection Not Found",
      description: "The requested furniture collection could not be found.",
    };
  }

  const { collection, heroTitle, heroDescription } = pageData;

  return {
    title: `${collection.label} Collection`,
    description: heroDescription ?? collection.heroDescription,
    openGraph: {
      title: heroTitle ?? collection.heroTitle,
    },
  };
}

export default async function CollectionPage({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const pageData = await getCollectionPageData(slug);

  if (!pageData) {
    notFound();
  }

  const { collection, products, heroTitle, heroDescription, heroImage, dataSource, shopifyConnected } =
    pageData;

  return (
    <CollectionView
      collection={collection}
      products={products}
      heroTitle={heroTitle}
      heroDescription={heroDescription}
      heroImage={heroImage}
      dataSource={dataSource}
      shopifyConnected={shopifyConnected}
    />
  );
}
