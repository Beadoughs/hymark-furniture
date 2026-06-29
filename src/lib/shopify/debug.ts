export type ProductDataSource = "shopify" | "mock";

export function logProductDataSource(
  context: string,
  source: ProductDataSource,
  detail?: string
) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const suffix = detail ? ` — ${detail}` : "";
  console.info(`[hymark:${source}] ${context}${suffix}`);
}

export function logShopifyWarning(context: string, message: string) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.warn(`[shopify] ${context}: ${message}`);
}
