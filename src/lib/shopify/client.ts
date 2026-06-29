import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { getShopifyConfig, isShopifyConfigured } from "@/lib/shopify/config";
import { logShopifyWarning } from "@/lib/shopify/debug";

function formatShopifyErrors(errors: unknown): string {
  if (Array.isArray(errors)) {
    return errors
      .map((error) =>
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : String(error)
      )
      .join("; ");
  }

  if (typeof errors === "object" && errors !== null && "message" in errors) {
    return String((errors as { message?: string }).message);
  }

  return "Shopify Storefront API request failed";
}

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
    const message = formatShopifyErrors(errors);
    logShopifyWarning("shopifyFetch", message);
    throw new Error(message);
  }

  return data as T;
}
