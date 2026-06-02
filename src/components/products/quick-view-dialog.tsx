"use client";

import Image from "next/image";
import { type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type QuickViewDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:min-h-[360px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover md:rounded-l-xl"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="p-6 md:p-8">
            <DialogHeader className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                {product.category}
              </p>
              <DialogTitle className="mt-2 font-serif text-2xl text-brand-charcoal">
                {product.title}
              </DialogTitle>
              <DialogDescription className="mt-4 text-base leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-semibold text-brand-orange">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-lg text-brand-silver line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-brand-charcoal">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="brand" className="flex-1">
                Enquire In Store
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="/showroom">Visit Showroom</a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
