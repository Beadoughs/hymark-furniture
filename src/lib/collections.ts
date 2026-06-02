import { PRODUCTS, type Product } from "@/lib/data";

export type CollectionConfig = {
  slug: "living" | "dining" | "bedroom" | "outdoor" | "clearance";
  label: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  categoryFilters?: string[];
  clearanceOnly?: boolean;
};

export const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "living",
    label: "Living",
    heroTitle: "Living Collections",
    heroDescription:
      "Statement lounges, recliners and living essentials curated for comfort, quality and everyday Tasmanian homes.",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85",
    categoryFilters: ["Lounges", "Recliners"],
  },
  {
    slug: "dining",
    label: "Dining",
    heroTitle: "Dining Collections",
    heroDescription:
      "Gather around beautifully crafted dining settings, tables and storage pieces designed to bring people together.",
    heroImage:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
    categoryFilters: ["Dining"],
  },
  {
    slug: "bedroom",
    label: "Bedroom",
    heroTitle: "Bedroom Collections",
    heroDescription:
      "Create restful spaces with premium beds, bedroom storage and timeless pieces made for long-term comfort.",
    heroImage:
      "https://images.unsplash.com/photo-1616594039964-40891a91a223?w=1600&q=85",
    categoryFilters: ["Bedroom"],
  },
  {
    slug: "outdoor",
    label: "Outdoor",
    heroTitle: "Outdoor Collections",
    heroDescription:
      "Entertain in style with weather-ready outdoor lounges and dining settings tailored for Tasmanian conditions.",
    heroImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=85",
    categoryFilters: ["Outdoor"],
  },
  {
    slug: "clearance",
    label: "Clearance",
    heroTitle: "Clearance Highlights",
    heroDescription:
      "Limited-time markdowns across premium ranges. Explore sale-priced favourites while stock lasts.",
    heroImage:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae83?w=1600&q=85",
    clearanceOnly: true,
  },
];

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getCollectionProducts(collection: CollectionConfig): Product[] {
  if (collection.clearanceOnly) {
    return PRODUCTS.filter((product) => typeof product.salePrice === "number");
  }

  if (!collection.categoryFilters?.length) {
    return PRODUCTS;
  }

  return PRODUCTS.filter((product) =>
    collection.categoryFilters?.includes(product.category)
  );
}
