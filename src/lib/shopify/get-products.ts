import { shopifyFetch } from "@/lib/shopify/client";
import { mapShopifyProducts } from "@/lib/shopify/mappers";
import { GET_PRODUCTS_QUERY } from "@/lib/shopify/queries";
import type { ShopifyProduct } from "@/lib/shopify/types";

type ProductsResponse = {
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
};

export async function getShopifyProducts(first = 20) {
  const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS_QUERY, {
    first,
  });

  return mapShopifyProducts(
    data.products.edges.map((edge) => edge.node)
  );
}

export async function getShopifySaleProducts(first = 50) {
  const products = await getShopifyProducts(first);
  return products.filter((product) => typeof product.salePrice === "number");
}
