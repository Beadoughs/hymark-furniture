"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { type Product, type ProductVariant } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { VariantPicker } from "@/components/products/variant-picker";
import { Button } from "@/components/ui/button";

type ProductViewProps = {
  product: Product;
  shopifyConnected?: boolean;
};

function getInitialSelectedOptions(
  product: Product
): Record<string, string> {
  const variants = product.variants ?? [];
  const defaultVariant =
    variants.find((variant) => variant.id === product.variantId) ??
    variants.find((variant) => variant.availableForSale) ??
    variants[0];

  if (!defaultVariant) {
    return {};
  }

  return Object.fromEntries(
    defaultVariant.selectedOptions
      .filter((option) => option.name !== "Title")
      .map((option) => [option.name, option.value])
  );
}

function findMatchingVariant(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>
): ProductVariant | undefined {
  return variants.find((variant) =>
    variant.selectedOptions.every((option) => {
      if (option.name === "Title" && option.value === "Default Title") {
        return true;
      }
      return selectedOptions[option.name] === option.value;
    })
  );
}

function getVariantDisplayPricing(variant: ProductVariant | undefined, product: Product) {
  if (!variant) {
    return { price: product.price, salePrice: product.salePrice };
  }

  const compareAt = variant.compareAtPrice;
  const salePrice =
    compareAt && compareAt > variant.price ? variant.price : undefined;
  const price =
    compareAt && compareAt > variant.price ? compareAt : variant.price;

  return { price, salePrice };
}

export function ProductView({
  product,
  shopifyConnected = false,
}: ProductViewProps) {
  const options = product.options ?? [];
  const hasSelectableVariants =
    (product.variants?.length ?? 0) > 1 && options.length > 0;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => getInitialSelectedOptions(product)
  );
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(
    null
  );

  const selectedVariant = useMemo(
    () => findMatchingVariant(product.variants ?? [], selectedOptions),
    [product.variants, selectedOptions]
  );

  const gallery = product.images?.length ? product.images : [product.image];
  const displayImage =
    activeGalleryImage ||
    selectedVariant?.image ||
    product.image;
  const { price, salePrice } = getVariantDisplayPricing(
    selectedVariant,
    product
  );
  const availableForSale = selectedVariant?.availableForSale ?? product.availableForSale;
  const variantId = selectedVariant?.id ?? product.variantId;

  const handleSelectOption = (optionName: string, value: string) => {
    setSelectedOptions((current) => ({
      ...current,
      [optionName]: value,
    }));
    setActiveGalleryImage(null);
  };

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
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge ? (
                <span className="absolute left-4 top-4 rounded-sm bg-brand-charcoal/80 px-3 py-1.5 text-xs font-medium text-white">
                  {product.badge}
                </span>
              ) : null}
            </div>
            {gallery.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((imageUrl) => (
                  <button
                    key={imageUrl}
                    type="button"
                    onClick={() => setActiveGalleryImage(imageUrl)}
                    className="relative aspect-square overflow-hidden rounded-md bg-secondary/70 ring-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-charcoal"
                  >
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${variantId}-${price}-${salePrice ?? "full"}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-baseline gap-3"
                >
                  {salePrice ? (
                    <>
                      <span className="text-3xl font-semibold text-brand-orange">
                        {formatPrice(salePrice)}
                      </span>
                      <span className="text-xl text-brand-silver line-through">
                        {formatPrice(price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-semibold text-brand-charcoal">
                      {formatPrice(price)}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {product.description ? (
              <p className="mt-6 text-base leading-relaxed text-brand-graphite">
                {product.description}
              </p>
            ) : null}

            {hasSelectableVariants ? (
              <div className="mt-8">
                <VariantPicker
                  options={options}
                  variants={product.variants ?? []}
                  selectedOptions={selectedOptions}
                  onSelect={handleSelectOption}
                />
                {selectedVariant && !selectedVariant.availableForSale ? (
                  <p className="mt-3 text-sm text-brand-orange">
                    This option is currently unavailable.
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {variantId ? (
                <AddToCartButton
                  variantId={variantId}
                  availableForSale={availableForSale}
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
