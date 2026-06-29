"use client";

import { useState } from "react";
import { type Product } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewDialog } from "@/components/products/quick-view-dialog";

type BestSellersGridProps = {
  products: Product[];
};

export function BestSellersGrid({ products }: BestSellersGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setDialogOpen(true);
  };

  return (
    <section id="best-sellers" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="Popular Picks"
            title="Best Sellers"
            description="Our most-loved pieces — premium quality, carefully selected for Tasmanian homes."
          />
        </FadeIn>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.05}>
              <ProductCard product={product} onQuickView={handleQuickView} />
            </FadeIn>
          ))}
        </div>
      </div>

      <QuickViewDialog
        product={quickViewProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
