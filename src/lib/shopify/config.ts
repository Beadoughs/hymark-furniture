const DEFAULT_API_VERSION = "2025-01";

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN?.trim() &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim()
  );
}

export function getShopifyConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || DEFAULT_API_VERSION;

  if (!storeDomain || !publicAccessToken) {
    throw new Error("Shopify Storefront API is not configured");
  }

  return { storeDomain, publicAccessToken, apiVersion };
}
