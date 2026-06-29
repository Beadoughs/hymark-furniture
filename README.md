# Hymark Furniture

Premium furniture retailer website for **Hymark Furniture** — a family-owned Australian furniture store serving Tasmania.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Lucide Icons, and **Shopify Storefront API** (headless commerce).

## Prerequisites

- Node.js 18.18+ (recommended: Node 20+)
- npm 9+
- (Optional) A Shopify store with Storefront API access for live products and checkout

## Setup

```bash
cd hymark-furniture
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo mode (no Shopify)

If `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are not set, the site uses mock product data from `src/lib/data.ts`. Collections, best sellers, and showroom pages work as before. Cart shows a demo message instead of checkout.

### Shopify headless mode

1. Copy `.env.example` to `.env.local`
2. Set the three Shopify variables (see below)
3. Restart the dev server

| Variable | Description |
| -------- | ----------- |
| `SHOPIFY_STORE_DOMAIN` | Store domain, e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API public access token |
| `SHOPIFY_STOREFRONT_API_VERSION` | API version, e.g. `2025-01` |

#### Create a Storefront API access token

1. In **Shopify Admin**, go to **Settings → Apps and sales channels**
2. Click **Develop apps** (enable custom app development if prompted)
3. **Create an app** (e.g. "Hymark Headless")
4. Under **Configuration**, enable **Storefront API** scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts` (cart/checkout)
   - `unauthenticated_read_checkouts`
5. **Install** the app on your store
6. Open **API credentials** → **Storefront API** → copy the **public** access token into `.env.local`

Never commit `.env.local` or real tokens to git.

#### Collections in Shopify Admin

Create **manual or automated collections** with handles that match site navigation:

| Site slug | Shopify collection handle |
| --------- | ------------------------- |
| `/collections/living` | `living` |
| `/collections/dining` | `dining` |
| `/collections/bedroom` | `bedroom` |
| `/collections/outdoor` | `outdoor` |
| `/collections/clearance` | `clearance` (or any products with compare-at pricing) |

Optional: a `best-sellers` collection powers the homepage best sellers section; otherwise the first products from the catalog are shown.

Product tags `best-seller`, `new`, and `sale` map to card badges.

## Troubleshooting Shopify collections

### Collections show demo products instead of your catalog

1. **Environment variables** — Copy `.env.example` to `.env.local` and set `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Restart the dev server after changes.
2. **Rebuild after adding env vars** — Collection pages use ISR (`revalidate: 60`). Run `npm run build` again when deploying so production picks up credentials.
3. **Test the connection** — Run `npm run test:shopify`. It reports per-collection product counts without printing tokens.

### Collections are empty when Shopify is connected

The site shows **“No products in this collection”** when Shopify is configured but a collection returns zero products (demo mock data is not used in that case).

| Check | What to do in Shopify Admin |
| ----- | ----------------------------- |
| **Collection handles** | Create collections with handles exactly: `living`, `dining`, `bedroom`, `outdoor`, `clearance` (URL slug = handle). |
| **Products in collection** | Open each collection → **Products** → add the relevant items. |
| **Sales channel publication** | Products must be published to the channel tied to your Storefront token (usually **Online Store** or a **Headless** custom app channel). In the product editor: **Product availability** → enable the correct channel. Bulk: **Products** → select items → **Bulk edit** → **Columns** → **Published on…** |
| **Storefront API scopes** | Custom app needs `unauthenticated_read_product_listings` (and related cart scopes for checkout). |
| **API version** | Match `SHOPIFY_STOREFRONT_API_VERSION` to a supported release (default `2025-01`). |

### Dev logging

In development (`npm run dev`), the server console logs `[hymark:shopify]` or `[hymark:mock]` when loading collections and best sellers. Warnings such as missing collection handles appear as `[shopify]`.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run test:shopify` | Test Storefront API connection (reads `.env.local`) |

## Brand Colors

| Name     | Hex       |
| -------- | --------- |
| Orange   | `#F97316` |
| Charcoal | `#2A2A2A` |
| Graphite | `#4A4A4A` |
| Silver   | `#B8B8B8` |
| White    | `#FFFFFF` |

## Logo

A placeholder SVG wordmark is included at `public/logo.svg`. Replace it with the official Hymark logo when available.

## Project Structure

```
src/
├── app/              # App Router pages & layout (includes /cart)
├── components/
│   ├── cart/         # Cart provider, drawer, add-to-cart
│   ├── layout/       # Header, footer, announcement bar
│   ├── sections/     # Homepage sections
│   ├── products/     # Product card & quick view
│   ├── ui/           # Shadcn UI components
│   └── motion/       # Framer Motion wrappers
└── lib/
    ├── shopify/      # Storefront API client, queries, cart actions
    ├── products.ts   # Unified Shopify + mock product fetching
    ├── collections.ts
    └── data.ts       # Mock/demo data fallback
```

## Headless cart

- **Add to cart** on product cards and quick view (when Shopify is configured)
- Cart icon in header with item count badge
- Cart drawer and `/cart` page with line quantities
- **Checkout** redirects to Shopify-hosted `checkoutUrl`

Cart ID is stored in an httpOnly cookie (`shopify-cart-id`).

## SEO

- Metadata and Open Graph tags in `src/app/layout.tsx`
- JSON-LD LocalBusiness schema (example Hobart address — replace with real details)
- Keywords targeting Tasmania furniture searches

## Notes

- Product prices and showroom address are mock/demo data when Shopify is not connected.
- Images load from Unsplash (demo) or `cdn.shopify.com` (live).
- Showroom enquiry flow remains for demo-mode products without `variantId`.
