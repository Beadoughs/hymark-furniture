"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Product } from "@/lib/data";
import { type CollectionConfig } from "@/lib/collections";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewDialog } from "@/components/products/quick-view-dialog";
import { Button } from "@/components/ui/button";

type CollectionViewProps = {
  collection: CollectionConfig;
  products: Product[];
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
};

export function CollectionView({
  collection,
  products,
  heroTitle,
  heroDescription,
  heroImage,
}: CollectionViewProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasProducts = products.length > 0;
  const introStat = useMemo(() => {
    if (collection.clearanceOnly) {
      return `${products.length} sale offers`;
    }

    return `${products.length} curated pieces`;
  }, [collection.clearanceOnly, products.length]);

  return (
    <section className="bg-white">
      <div className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={heroImage ?? collection.heroImage}
            alt={heroTitle ?? collection.heroTitle}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-charcoal/56" />
        </div>
        <div className="site-container relative py-20 md:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
            Hymark Collections
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl text-white md:text-5xl">
            {heroTitle ?? collection.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg">
            {heroDescription ?? collection.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/35 px-4 py-1.5 text-sm font-medium text-white/95">
              {introStat}
            </span>
            <Button
              variant="outline"
              className="border-white/55 bg-transparent text-white hover:bg-white/12 hover:text-white"
              asChild
            >
              <Link href="/showroom">Visit Showroom</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="site-container section-space">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand-graphite">
              In Stock Now
            </p>
            <h2 className="mt-2 font-serif text-3xl text-brand-charcoal md:text-4xl">
              Explore The Range
            </h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/contact">
              Need styling advice?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {hasProducts ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(selectedProduct) => {
                  setQuickViewProduct(selectedProduct);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-border bg-secondary/30 p-8 text-center">
            <h3 className="font-serif text-2xl text-brand-charcoal">
              New arrivals landing soon
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-brand-graphite">
              Our buyers are finalizing this range. Visit our showroom for early
              access or contact the team for current floor stock.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="brand" asChild>
                <Link href="/showroom">Visit Showroom</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Team</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <QuickViewDialog
        product={quickViewProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
