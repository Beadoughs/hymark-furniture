"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  showAddToCart?: boolean;
};

function getProductHref(product: Product): string | null {
  if (product.handle) {
    return `/products/${product.handle}`;
  }

  return null;
}

export function ProductCard({
  product,
  onQuickView,
  showAddToCart = true,
}: ProductCardProps) {
  const productHref = getProductHref(product);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary/70">
        {productHref ? (
          <Link
            href={productHref}
            className="absolute inset-0 z-0 block"
            aria-label={`View ${product.title}`}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
        ) : (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-sm bg-brand-charcoal/80 px-2.5 py-1 text-[11px] font-medium text-white">
            {product.badge}
          </span>
        )}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 rounded-sm border border-white/80 bg-white/95 px-2.5 text-xs"
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </div>
        {showAddToCart && product.variantId ? (
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-3 transition-transform duration-200 group-hover:translate-y-0">
            <AddToCartButton
              variantId={product.variantId}
              availableForSale={product.availableForSale}
              size="sm"
            />
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-3 transition-transform duration-200 group-hover:translate-y-0 md:hidden">
            <Button
              variant="charcoal"
              className="w-full"
              onClick={() => onQuickView(product)}
            >
              Quick View
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-graphite">
          {product.category}
        </p>
        {productHref ? (
          <Link href={productHref} className="mt-1 block">
            <h3 className="line-clamp-2 font-medium text-brand-charcoal transition-colors hover:text-brand-orange">
              {product.title}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 line-clamp-2 font-medium text-brand-charcoal">
            {product.title}
          </h3>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-semibold text-brand-orange">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-brand-silver line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-brand-charcoal">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {showAddToCart && product.variantId ? (
          <div className="mt-3 md:hidden">
            <AddToCartButton
              variantId={product.variantId}
              availableForSale={product.availableForSale}
              size="sm"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
