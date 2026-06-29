"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";

type ProductViewProps = {
  product: Product;
  shopifyConnected?: boolean;
};

export function ProductView({
  product,
  shopifyConnected = false,
}: ProductViewProps) {
  const gallery = product.images?.length ? product.images : [product.image];

  return (
    <section className="bg-white">
      <div className="site-container section-space">
        <Button variant="ghost" className="mb-8 -ml-2" asChild>
          <Link href="/collections/living">
            <ArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary/70">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge ? (
                <span className="absolute left-4 top-4 rounded-sm bg-brand-charcoal/80 px-3 py-1.5 text-xs font-medium text-white">
                  {product.badge}
                </span>
              ) : null}
            </div>
            {gallery.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className="relative aspect-square overflow-hidden rounded-md bg-secondary/70"
                  >
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-brand-charcoal md:text-5xl">
              {product.title}
            </h1>
            <div className="mt-6 flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-semibold text-brand-orange">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xl text-brand-silver line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-semibold text-brand-charcoal">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {product.description ? (
              <p className="mt-6 text-base leading-relaxed text-brand-graphite">
                {product.description}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {product.variantId ? (
                <AddToCartButton
                  variantId={product.variantId}
                  availableForSale={product.availableForSale}
                  className="sm:flex-1"
                  showIcon
                />
              ) : shopifyConnected ? (
                <Button variant="outline" className="sm:flex-1" asChild>
                  <Link href="/contact">Enquire In Store</Link>
                </Button>
              ) : (
                <Button variant="brand" className="sm:flex-1" asChild>
                  <Link href="/showroom">Visit Showroom</Link>
                </Button>
              )}
              <Button variant="outline" className="sm:flex-1" asChild>
                <Link href="/showroom">Visit Showroom</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-brand-silver">
              Delivery available across Tasmania. Shipping calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
