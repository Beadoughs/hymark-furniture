import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/collections";
import { getCollectionProductCount } from "@/lib/products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Shop Collections",
  description:
    "Browse Hymark Furniture collections including living, dining, bedroom, outdoor and clearance favourites.",
};

export const revalidate = 60;

export default async function CollectionsLandingPage() {
  const collectionsWithCounts = await Promise.all(
    COLLECTIONS.map(async (collection) => ({
      collection,
      productsCount: await getCollectionProductCount(collection.slug),
    }))
  );

  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
            Shop By Collection
          </p>
          <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
            Explore Every Hymark Range
          </h1>
          <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
            Discover curated living, dining, bedroom and outdoor pieces, plus
            clearance offers updated with sale-ready stock.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {collectionsWithCounts.map(({ collection, productsCount }) => (
            <article
              key={collection.slug}
              className="rounded-md border border-border bg-secondary/20 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-silver">
                {productsCount} products
              </p>
              <h2 className="mt-3 font-serif text-3xl text-brand-charcoal">
                {collection.label}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-graphite">
                {collection.heroDescription}
              </p>
              <Button variant="ghost" className="mt-5 px-0" asChild>
                <Link href={`/collections/${collection.slug}`}>
                  View {collection.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
