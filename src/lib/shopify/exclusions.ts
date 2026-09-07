/**
 * Products removed in Shopify Admin can briefly remain in Storefront /
 * ISR responses. Keep this list empty unless a deleted listing must be
 * forced off the site immediately.
 */
const EXCLUDED_HANDLES = new Set(["hendricks-dining-chair"]);

const EXCLUDED_TITLES = new Set(["hendricks dining chair"]);

export function isExcludedProduct(product: {
  handle?: string | null;
  title?: string | null;
}): boolean {
  const handle = product.handle?.trim().toLowerCase();
  if (handle && EXCLUDED_HANDLES.has(handle)) {
    return true;
  }

  const title = product.title?.trim().toLowerCase();
  return Boolean(title && EXCLUDED_TITLES.has(title));
}

export function withoutExcludedProducts<T extends { handle?: string | null; title?: string | null }>(
  products: T[]
): T[] {
  return products.filter((product) => !isExcludedProduct(product));
}
