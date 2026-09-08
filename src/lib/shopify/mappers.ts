import type { Product, ProductOption, ProductVariant } from "@/lib/data";
import { withoutExcludedProducts } from "@/lib/shopify/exclusions";
import type { ShopifyProduct } from "@/lib/shopify/types";

function parseAmount(amount: string): number {
  return Math.round(parseFloat(amount));
}

function getPrimaryVariant(product: ShopifyProduct) {
  const variants = product.variants.edges.map((edge) => edge.node);
  return (
    variants.find((variant) => variant.availableForSale) ?? variants[0]
  );
}

function getProductImages(product: ShopifyProduct, fallback: string): string[] {
  const fromGallery =
    product.images?.edges
      .map((edge) => edge.node.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  if (fromGallery.length > 0) {
    return fromGallery;
  }

  return [fallback];
}

function mapOptions(product: ShopifyProduct): ProductOption[] {
  return (product.options ?? [])
    .filter(
      (option) =>
        !(
          option.name === "Title" &&
          option.values.length === 1 &&
          option.values[0] === "Default Title"
        )
    )
    .map((option) => ({
      name: option.name,
      values: option.values,
    }));
}

function mapVariants(product: ShopifyProduct): ProductVariant[] {
  return product.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    availableForSale: node.availableForSale,
    price: parseAmount(node.price.amount),
    compareAtPrice: node.compareAtPrice?.amount
      ? parseAmount(node.compareAtPrice.amount)
      : undefined,
    image: node.image?.url || undefined,
    selectedOptions: (node.selectedOptions ?? []).map((option) => ({
      name: option.name,
      value: option.value,
    })),
  }));
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
    "/images/lounges-collection.jpg";

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
    availableForSale: variant?.availableForSale ?? false,
    title: product.title,
    category: product.productType || "Furniture",
    price: regularPrice,
    salePrice,
    image,
    images: getProductImages(product, image),
    description: product.description || "",
    badge,
    source: "shopify",
    options: mapOptions(product),
    variants: mapVariants(product),
  };
}

export function mapShopifyProducts(products: ShopifyProduct[]): Product[] {
  return withoutExcludedProducts(
    products.map(mapShopifyProductToProduct)
  );
}
