import { PRODUCTS, type Product } from "@/lib/data";
import {
  getCollectionBySlug,
  getCollectionProducts,
  type CollectionConfig,
} from "@/lib/collections";
import { isShopifyConfigured } from "@/lib/shopify/config";
import { getShopifyCollectionByHandle } from "@/lib/shopify/get-collections";
import {
  getShopifyProducts,
  getShopifySaleProducts,
} from "@/lib/shopify/get-products";

export type CollectionPageData = {
  collection: CollectionConfig;
  products: Product[];
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
};

export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      const collection = await getShopifyCollectionByHandle("best-sellers", limit);
      if (collection.products.length > 0) {
        return collection.products;
      }
      return (await getShopifyProducts(limit)).slice(0, limit);
    } catch (error) {
      console.error("[shopify] Failed to load best sellers:", error);
    }
  }

  return PRODUCTS.slice(0, limit);
}

export async function getCollectionPageData(
  slug: string
): Promise<CollectionPageData | null> {
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    return null;
  }

  if (isShopifyConfigured()) {
    try {
      if (collection.clearanceOnly) {
        const saleProducts = await getShopifySaleProducts();
        if (saleProducts.length > 0) {
          return { collection, products: saleProducts };
        }

        const clearanceCollection = await getShopifyCollectionByHandle(
          "clearance"
        );
        if (clearanceCollection.products.length > 0) {
          return {
            collection,
            products: clearanceCollection.products,
            heroTitle: clearanceCollection.title,
            heroDescription: clearanceCollection.description,
            heroImage: clearanceCollection.heroImage,
          };
        }
      } else {
        const shopifyCollection = await getShopifyCollectionByHandle(
          collection.slug
        );

        if (shopifyCollection.products.length > 0) {
          return {
            collection,
            products: shopifyCollection.products,
            heroTitle: shopifyCollection.title,
            heroDescription: shopifyCollection.description,
            heroImage: shopifyCollection.heroImage,
          };
        }
      }
    } catch (error) {
      console.error(`[shopify] Failed to load collection "${slug}":`, error);
    }
  }

  return {
    collection,
    products: getCollectionProducts(collection),
  };
}
