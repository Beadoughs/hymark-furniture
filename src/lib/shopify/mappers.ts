import type { Product } from "@/lib/data";
import type { ShopifyProduct } from "@/lib/shopify/types";

function parseAmount(amount: string): number {
  return Math.round(parseFloat(amount));
}

function getPrimaryVariant(product: ShopifyProduct) {
  return product.variants.edges[0]?.node;
}

export function mapShopifyProductToProduct(product: ShopifyProduct): Product {
  const variant = getPrimaryVariant(product);
  const price = variant
    ? parseAmount(variant.price.amount)
    : parseAmount(product.priceRange.minVariantPrice.amount);

  const compareAt = variant?.compareAtPrice?.amount
    ? parseAmount(variant.compareAtPrice.amount)
    : product.compareAtPriceRange.minVariantPrice.amount !== "0.0"
      ? parseAmount(product.compareAtPriceRange.minVariantPrice.amount)
      : undefined;

  const salePrice =
    compareAt && compareAt > price ? price : undefined;
  const regularPrice = compareAt && compareAt > price ? compareAt : price;

  const image =
    product.featuredImage?.url ||
    variant?.image?.url ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";

  const badge = product.tags.includes("best-seller")
    ? "Best Seller"
    : product.tags.includes("new")
      ? "New"
      : product.tags.includes("sale") || salePrice
        ? "Sale"
        : undefined;

  return {
    id: product.id,
    handle: product.handle,
    variantId: variant?.id,
    availableForSale: variant?.availableForSale ?? true,
    title: product.title,
    category: product.productType || "Furniture",
    price: regularPrice,
    salePrice,
    image,
    description: product.description || "",
    badge,
    source: "shopify",
  };
}

export function mapShopifyProducts(products: ShopifyProduct[]): Product[] {
  return products.map(mapShopifyProductToProduct);
}
