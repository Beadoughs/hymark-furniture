import { shopifyFetch } from "@/lib/shopify/client";
import { mapShopifyProducts } from "@/lib/shopify/mappers";
import { GET_COLLECTION_BY_HANDLE_QUERY } from "@/lib/shopify/queries";
import type { ShopifyCollection } from "@/lib/shopify/types";
import type { Product } from "@/lib/data";

type CollectionResponse = {
  collection: ShopifyCollection | null;
};

export type ShopifyCollectionResult = {
  title?: string;
  description?: string;
  heroImage?: string;
  products: Product[];
};

export async function getShopifyCollectionByHandle(
  handle: string,
  first = 50
): Promise<ShopifyCollectionResult> {
  const data = await shopifyFetch<CollectionResponse>(
    GET_COLLECTION_BY_HANDLE_QUERY,
    { handle, first }
  );

  const collection = data.collection;

  if (!collection) {
    return { products: [] };
  }

  return {
    title: collection.title,
    description: collection.description,
    heroImage: collection.image?.url,
    products: mapShopifyProducts(
      collection.products.edges.map((edge) => edge.node)
    ),
  };
}
