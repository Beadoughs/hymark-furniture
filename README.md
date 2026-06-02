# Hymark Furniture

Premium furniture retailer website for **Hymark Furniture** — a family-owned Australian furniture store serving Tasmania.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, and Lucide Icons.

## Prerequisites

- Node.js 18.18+ (recommended: Node 20+)
- npm 9+

## Setup

```bash
cd hymark-furniture
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

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
├── app/              # App Router pages & layout
├── components/
│   ├── layout/       # Header, footer, announcement bar
│   ├── sections/     # Homepage sections
│   ├── products/     # Product card & quick view
│   ├── ui/           # Shadcn UI components
│   └── motion/       # Framer Motion wrappers
└── lib/              # Data, utilities
```

## SEO

- Metadata and Open Graph tags in `src/app/layout.tsx`
- JSON-LD LocalBusiness schema (example Hobart address — replace with real details)
- Keywords targeting Tasmania furniture searches

## Notes

- Product prices and showroom address are mock/demo data.
- Images load from Unsplash (configured in `next.config.ts`).
- Wishlist is UI-only (local toggle state).
