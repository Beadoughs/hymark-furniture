import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { getShopifyConfig, isShopifyConfigured } from "@/lib/shopify/config";

export function getShopifyClient() {
  const { storeDomain, publicAccessToken, apiVersion } = getShopifyConfig();

  return createStorefrontApiClient({
    storeDomain,
    apiVersion,
    publicAccessToken,
  });
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured");
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<T>(query, {
    variables,
  });

  if (errors) {
    const message =
      typeof errors === "object" && errors !== null && "message" in errors
        ? String((errors as { message?: string }).message)
        : "Shopify Storefront API request failed";
    throw new Error(message);
  }

  return data as T;
}
