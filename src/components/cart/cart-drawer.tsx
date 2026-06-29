"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    isEnabled,
    isLoading,
    updateLine,
    removeLine,
  } = useCart();

  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const checkoutUrl = cart?.checkoutUrl;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left font-serif text-xl">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {!isEnabled ? (
          <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag className="h-10 w-10 text-brand-silver" />
            <p className="mt-4 text-sm text-brand-graphite">
              Online checkout is available when Shopify is connected. Browse
              collections in demo mode or visit our showroom.
            </p>
            <Button variant="brand" className="mt-6" asChild>
              <Link href="/showroom" onClick={closeCart}>
                Visit Showroom
              </Link>
            </Button>
          </div>
        ) : lines.length === 0 ? (
          <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag className="h-10 w-10 text-brand-silver" />
            <p className="mt-4 text-sm text-brand-graphite">
              Your cart is empty. Explore our curated ranges to get started.
            </p>
            <Button variant="brand" className="mt-6" asChild>
              <Link href="/collections/living" onClick={closeCart}>
                Shop Living
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {lines.map((line) => {
                const imageUrl = line.merchandise.image?.url;
                return (
                  <li
                    key={line.id}
                    className="flex gap-3 border-b border-border pb-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary/70">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-brand-silver" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-brand-charcoal">
                        {line.merchandise.product.title}
                      </p>
                      <p className="mt-1 text-sm text-brand-graphite">
                        {formatMoney(line.merchandise.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          disabled={isLoading}
                          onClick={() =>
                            updateLine(line.id, Math.max(1, line.quantity - 1))
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">
                          {line.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          disabled={isLoading}
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-7 w-7 text-brand-graphite"
                          disabled={isLoading}
                          onClick={() => removeLine(line.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-graphite">Subtotal</span>
                <span className="font-semibold text-brand-charcoal">
                  {cart?.cost.subtotalAmount
                    ? formatMoney(cart.cost.subtotalAmount)
                    : "—"}
                </span>
              </div>
              <p className="mt-2 text-xs text-brand-silver">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {checkoutUrl ? (
                  <Button variant="brand" className="w-full" asChild>
                    <a href={checkoutUrl}>Checkout</a>
                  </Button>
                ) : null}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cart" onClick={closeCart}>
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
