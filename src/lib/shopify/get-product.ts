import { shopifyFetch } from "@/lib/shopify/client";
import { mapShopifyProductToProduct } from "@/lib/shopify/mappers";
import { GET_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/queries";
import type { ShopifyProduct } from "@/lib/shopify/types";
import type { Product } from "@/lib/data";

type ProductByHandleResponse = {
  product: ShopifyProduct | null;
};

export async function getShopifyProductByHandle(
  handle: string
): Promise<Product | null> {
  const data = await shopifyFetch<ProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );

  if (!data.product) {
    return null;
  }

  return mapShopifyProductToProduct(data.product);
}
