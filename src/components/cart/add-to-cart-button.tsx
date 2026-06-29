"use client";

import { useState, useTransition } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  variantId?: string;
  availableForSale?: boolean;
  className?: string;
  size?: "sm" | "default";
  showIcon?: boolean;
};

export function AddToCartButton({
  variantId,
  availableForSale = true,
  className,
  size = "default",
  showIcon = false,
}: AddToCartButtonProps) {
  const { addToCart, isEnabled, isLoading } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canAdd = Boolean(variantId) && availableForSale;
  const disabled = isLoading || isPending || (!canAdd && isEnabled);

  const handleClick = () => {
    if (!variantId) {
      return;
    }

    setError(null);
    startTransition(() => {
      void addToCart(variantId).then((message) => {
        if (message) {
          setError(message);
        }
      });
    });
  };

  let label = "Add to Cart";
  if (!isEnabled) {
    label = "Demo Mode";
  } else if (!canAdd) {
    label = "Unavailable";
  } else if (isPending) {
    label = "Adding…";
  }

  return (
    <div className="w-full">
      <Button
        type="button"
        variant={isEnabled && canAdd ? "charcoal" : "outline"}
        size={size}
        className={cn("w-full", className)}
        disabled={disabled}
        onClick={handleClick}
      >
        {showIcon ? <ShoppingBag className="h-4 w-4" /> : null}
        {label}
      </Button>
      {error ? (
        <p className="mt-1.5 text-xs text-brand-orange" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
