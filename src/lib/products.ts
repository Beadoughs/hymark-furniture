import { PRODUCTS, type Product } from "@/lib/data";
import {
  getCollectionBySlug,
  getCollectionProducts,
  type CollectionConfig,
} from "@/lib/collections";
import { isShopifyConfigured } from "@/lib/shopify/config";
import {
  logProductDataSource,
  logShopifyWarning,
  type ProductDataSource,
} from "@/lib/shopify/debug";
import { isExcludedProduct } from "@/lib/shopify/exclusions";
import { getShopifyCollectionByHandle } from "@/lib/shopify/get-collections";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getShopifyProductByHandle } from "@/lib/shopify/get-product";

export type CollectionPageData = {
  collection: CollectionConfig;
  products: Product[];
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  dataSource: ProductDataSource;
  shopifyConnected: boolean;
};

export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      // When Shopify is connected, never mix in mock PRODUCTS — return API
      // results only (or [] if empty / failed).
      const collection = await getShopifyCollectionByHandle("best-sellers", limit);
      if (collection.products.length > 0) {
        logProductDataSource(
          "best sellers",
          "shopify",
          `best-sellers collection (${collection.products.length} products)`
        );
        return collection.products.slice(0, limit);
      }

      const catalog = (await getShopifyProducts(limit)).slice(0, limit);
      if (catalog.length > 0) {
        logProductDataSource(
          "best sellers",
          "shopify",
          `catalog fallback (${catalog.length} products)`
        );
        return catalog;
      }

      logShopifyWarning(
        "best sellers",
        "Shopify connected but no products returned — check sales channel publication"
      );
      return [];
    } catch (error) {
      console.error("[shopify] Failed to load best sellers:", error);
      return [];
    }
  }

  logProductDataSource("best sellers", "mock");
  return PRODUCTS.filter((product) => !isExcludedProduct(product)).slice(
    0,
    limit
  );
}

export async function getCollectionPageData(
  slug: string
): Promise<CollectionPageData | null> {
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    return null;
  }

  const shopifyConnected = isShopifyConfigured();

  if (shopifyConnected) {
    try {
      const shopifyCollection = await getShopifyCollectionByHandle(
        collection.slug
      );

      logProductDataSource(
        `collection "${slug}"`,
        "shopify",
        shopifyCollection.products.length > 0
          ? `${shopifyCollection.products.length} products`
          : "collection empty or unpublished"
      );

      return {
        collection,
        products: shopifyCollection.products,
        heroTitle: shopifyCollection.title,
        heroDescription: shopifyCollection.description,
        heroImage: shopifyCollection.heroImage,
        dataSource: "shopify",
        shopifyConnected: true,
      };
    } catch (error) {
      console.error(`[shopify] Failed to load collection "${slug}":`, error);
      return {
        collection,
        products: [],
        dataSource: "shopify",
        shopifyConnected: true,
      };
    }
  }

  const mockProducts = getCollectionProducts(collection).filter(
    (product) => !isExcludedProduct(product)
  );
  logProductDataSource(
    `collection "${slug}"`,
    "mock",
    `${mockProducts.length} products (set SHOPIFY_* in .env.local for live data)`
  );

  return {
    collection,
    products: mockProducts,
    dataSource: "mock",
    shopifyConnected: false,
  };
}

export async function getCollectionProductCount(
  slug: CollectionConfig["slug"]
): Promise<number> {
  const pageData = await getCollectionPageData(slug);
  return pageData?.products.length ?? 0;
}

export async function getProductPageData(
  handle: string
): Promise<{ product: Product; shopifyConnected: boolean } | null> {
  if (isExcludedProduct({ handle, title: handle.replace(/-/g, " ") })) {
    return null;
  }

  if (isShopifyConfigured()) {
    try {
      const product = await getShopifyProductByHandle(handle);
      if (product && !isExcludedProduct(product)) {
        return { product, shopifyConnected: true };
      }
      // Shopify connected: never fall back to mock for missing/deleted products
      return null;
    } catch (error) {
      console.error(`[shopify] Failed to load product "${handle}":`, error);
      return null;
    }
  }

  const mockProduct = PRODUCTS.find(
    (product) => product.handle === handle || product.id === handle
  );

  if (!mockProduct || isExcludedProduct(mockProduct)) {
    return null;
  }

  return { product: mockProduct, shopifyConnected: false };
}
