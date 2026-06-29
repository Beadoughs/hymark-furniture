"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  addToCart as addToCartAction,
  getCart,
  isCartEnabled,
  removeCartLine,
  updateCartLine,
} from "@/lib/shopify/cart-actions";
import type { ShopifyCart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: ShopifyCart | null;
  itemCount: number;
  isLoading: boolean;
  isEnabled: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<string | null>;
  updateLine: (lineId: string, quantity: number) => Promise<string | null>;
  removeLine: (lineId: string) => Promise<string | null>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const refreshCart = useCallback(async () => {
    const nextCart = await getCart();
    setCart(nextCart);
  }, []);

  useEffect(() => {
    startTransition(() => {
      void (async () => {
        const enabled = await isCartEnabled();
        setIsEnabled(enabled);
        if (enabled) {
          await refreshCart();
        }
      })();
    });
  }, [refreshCart]);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      const result = await addToCartAction(variantId, quantity);
      if (result.cart) {
        setCart(result.cart);
        setIsOpen(true);
      }
      return result.error ?? null;
    },
    []
  );

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    const result = await updateCartLine(lineId, quantity);
    if (result.cart) {
      setCart(result.cart);
    }
    return result.error ?? null;
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    const result = await removeCartLine(lineId);
    setCart(result.cart);
    return result.error ?? null;
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: cart?.totalQuantity ?? 0,
      isLoading,
      isEnabled,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      updateLine,
      removeLine,
      refreshCart,
    }),
    [addToCart, cart, isEnabled, isLoading, isOpen, refreshCart, removeLine, updateLine]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
