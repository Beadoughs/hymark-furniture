#!/usr/bin/env node
/**
 * Quick Shopify Storefront API connectivity check.
 * Usage: node scripts/test-shopify.mjs
 * Reads .env.local from project root (does not print secrets).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

function loadEnvFile(path) {
  const env = {};
  if (!existsSync(path)) {
    return env;
  }

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const fileEnv = loadEnvFile(envPath);
const storeDomain =
  process.env.SHOPIFY_STORE_DOMAIN?.trim() ||
  fileEnv.SHOPIFY_STORE_DOMAIN?.trim();
const token =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim() ||
  fileEnv.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
const apiVersion =
  process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() ||
  fileEnv.SHOPIFY_STOREFRONT_API_VERSION?.trim() ||
  "2025-01";

const handles = ["living", "dining", "bedroom", "outdoor", "clearance"];

console.log("Hymark Shopify connectivity test\n");
console.log(`  .env.local: ${existsSync(envPath) ? "found" : "MISSING"}`);
console.log(`  SHOPIFY_STORE_DOMAIN: ${storeDomain ? "set" : "NOT SET"}`);
console.log(
  `  SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${token ? "set" : "NOT SET"}`
);
console.log(`  API version: ${apiVersion}\n`);

if (!storeDomain || !token) {
  console.error(
    "FAIL — Copy .env.example to .env.local and add your Storefront API credentials."
  );
  process.exit(1);
}

const query = `
  query TestCollections($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
    products(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

async function testHandle(handle) {
  const url = `https://${storeDomain}/api/${apiVersion}/graphql.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  });

  if (!response.ok) {
    return { ok: false, error: `HTTP ${response.status} ${response.statusText}` };
  }

  const json = await response.json();
  if (json.errors?.length) {
    return {
      ok: false,
      error: json.errors.map((e) => e.message).join("; "),
    };
  }

  const collection = json.data?.collection;
  const catalogCount = json.data?.products?.edges?.length ?? 0;

  return {
    ok: true,
    collectionFound: Boolean(collection),
    collectionTitle: collection?.title ?? null,
    productCount: collection?.products?.edges?.length ?? 0,
    catalogCount,
  };
}

try {
  let anyProducts = false;

  for (const handle of handles) {
    const result = await testHandle(handle);
    if (!result.ok) {
      console.log(`  ${handle}: FAIL — ${result.error}`);
      continue;
    }

    if (!result.collectionFound) {
      console.log(
        `  ${handle}: collection NOT FOUND (check handle in Shopify Admin)`
      );
      continue;
    }

    console.log(
      `  ${handle}: "${result.collectionTitle}" — ${result.productCount} product(s) in collection`
    );
    if (result.productCount > 0) anyProducts = true;
    if (handle === "living" && result.catalogCount === 0) {
      console.log(
        "  catalog: 0 products visible to Storefront API (check sales channel publication)"
      );
    } else if (handle === "living") {
      console.log(
        `  catalog: ${result.catalogCount} product(s) visible to Storefront API`
      );
    }
  }

  console.log("");
  if (anyProducts) {
    console.log("SUCCESS — Shopify returned products for at least one collection.");
  } else {
    console.log(
      "WARN — API connected but no collection products returned. In Shopify Admin:"
    );
    console.log("  1. Create collections with handles: living, dining, bedroom, outdoor, clearance");
    console.log("  2. Add products to each collection");
    console.log(
      "  3. Publish products to the sales channel tied to your Storefront token (Online Store or Headless)"
    );
  }
} catch (error) {
  console.error("FAIL —", error instanceof Error ? error.message : error);
  process.exit(1);
}
