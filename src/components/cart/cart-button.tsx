"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  className?: string;
};

export function CartButton({ className }: CartButtonProps) {
  const { itemCount, openCart } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      onClick={openCart}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-semibold text-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </Button>
  );
}

export function CartLinkButton({ className }: CartButtonProps) {
  const { itemCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      asChild
    >
      <Link
        href="/cart"
        aria-label={`View cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
      >
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-semibold text-white">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
