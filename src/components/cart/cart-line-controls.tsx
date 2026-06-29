"use client";

import { useTransition } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

type CartLineControlsProps = {
  lineId: string;
  quantity: number;
};

export function CartLineControls({ lineId, quantity }: CartLineControlsProps) {
  const { updateLine, removeLine, isLoading } = useCart();
  const [isPending, startTransition] = useTransition();

  const busy = isLoading || isPending;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={busy}
        onClick={() =>
          startTransition(() => {
            void updateLine(lineId, Math.max(1, quantity - 1));
          })
        }
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <span className="w-6 text-center text-sm">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={busy}
        onClick={() =>
          startTransition(() => {
            void updateLine(lineId, quantity + 1);
          })
        }
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-brand-graphite"
        disabled={busy}
        onClick={() =>
          startTransition(() => {
            void removeLine(lineId);
          })
        }
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
