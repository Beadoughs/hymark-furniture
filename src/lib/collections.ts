import { PRODUCTS, type Product } from "@/lib/data";

export type CollectionConfig = {
  slug: "living" | "dining" | "lounges";
  label: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  categoryFilters?: string[];
};

export const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "living",
    label: "Living",
    heroTitle: "Living Collections",
    heroDescription:
      "Living essentials curated for comfort, quality and everyday Tasmanian homes — from recliners to refined workspaces.",
    heroImage: "/images/living-collection.jpg",
    categoryFilters: ["Living"],
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
    slug: "lounges",
    label: "Lounges",
    heroTitle: "Lounges Collections",
    heroDescription:
      "Statement lounges and modular seating curated for comfort, quality and everyday Tasmanian homes.",
    heroImage: "/images/lounges-collection.jpg",
    categoryFilters: ["Lounge"],
  },
];

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getCollectionProducts(collection: CollectionConfig): Product[] {
  if (!collection.categoryFilters?.length) {
    return PRODUCTS;
  }

  return PRODUCTS.filter((product) =>
    collection.categoryFilters?.includes(product.category)
  );
}
