import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COLLECTIONS,
  getCollectionBySlug,
  getCollectionProducts,
} from "@/lib/collections";
import { CollectionView } from "@/components/pages/collection-view";

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
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found",
      description: "The requested furniture collection could not be found.",
    };
  }

  return {
    title: `${collection.label} Collection`,
    description: collection.heroDescription,
  };
}

export default async function CollectionPage({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getCollectionProducts(collection);

  return <CollectionView collection={collection} products={products} />;
}
