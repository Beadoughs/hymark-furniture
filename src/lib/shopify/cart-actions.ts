"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/client";
import { isShopifyConfigured } from "@/lib/shopify/config";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from "@/lib/shopify/queries";
import type { ShopifyCart } from "@/lib/shopify/types";

const CART_COOKIE = "shopify-cart-id";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

type CartMutationResponse = {
  cartCreate?: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
  cartLinesAdd?: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
  cartLinesUpdate?: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
  cartLinesRemove?: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
};

type CartQueryResponse = {
  cart: ShopifyCart | null;
};

function assertNoUserErrors(
  userErrors: Array<{ message: string }> | undefined
) {
  if (userErrors?.length) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }
}

async function setCartCookie(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
  revalidatePath("/cart");
}

async function getCartIdFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

export async function getCart(): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) {
    return null;
  }

  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    return null;
  }

  try {
    const data = await shopifyFetch<CartQueryResponse>(GET_CART_QUERY, {
      cartId,
    });
    return data.cart;
  } catch {
    return null;
  }
}

export async function addToCart(
  variantId: string,
  quantity = 1
): Promise<{ cart: ShopifyCart | null; error?: string }> {
  if (!isShopifyConfigured()) {
    return {
      cart: null,
      error: "Shopify checkout is not configured. Browse in demo mode.",
    };
  }

  try {
    const existingCartId = await getCartIdFromCookie();

    if (!existingCartId) {
      const data = await shopifyFetch<CartMutationResponse>(
        CART_CREATE_MUTATION,
        {
          lines: [{ merchandiseId: variantId, quantity }],
        }
      );

      assertNoUserErrors(data.cartCreate?.userErrors);
      const cart = data.cartCreate?.cart ?? null;

      if (cart?.id) {
        await setCartCookie(cart.id);
      }

      return { cart };
    }

    const data = await shopifyFetch<CartMutationResponse>(
      CART_LINES_ADD_MUTATION,
      {
        cartId: existingCartId,
        lines: [{ merchandiseId: variantId, quantity }],
      }
    );

    assertNoUserErrors(data.cartLinesAdd?.userErrors);
    revalidatePath("/cart");
    return { cart: data.cartLinesAdd?.cart ?? null };
  } catch (error) {
    return {
      cart: null,
      error:
        error instanceof Error ? error.message : "Unable to add item to cart",
    };
  }
}

export async function updateCartLine(
  lineId: string,
  quantity: number
): Promise<{ cart: ShopifyCart | null; error?: string }> {
  if (!isShopifyConfigured()) {
    return { cart: null, error: "Shopify checkout is not configured." };
  }

  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    return { cart: null, error: "Cart not found." };
  }

  try {
    const data = await shopifyFetch<CartMutationResponse>(
      CART_LINES_UPDATE_MUTATION,
      {
        cartId,
        lines: [{ id: lineId, quantity }],
      }
    );

    assertNoUserErrors(data.cartLinesUpdate?.userErrors);
    revalidatePath("/cart");
    return { cart: data.cartLinesUpdate?.cart ?? null };
  } catch (error) {
    return {
      cart: null,
      error:
        error instanceof Error ? error.message : "Unable to update cart line",
    };
  }
}

export async function removeCartLine(
  lineId: string
): Promise<{ cart: ShopifyCart | null; error?: string }> {
  if (!isShopifyConfigured()) {
    return { cart: null, error: "Shopify checkout is not configured." };
  }

  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    return { cart: null, error: "Cart not found." };
  }

  try {
    const data = await shopifyFetch<CartMutationResponse>(
      CART_LINES_REMOVE_MUTATION,
      {
        cartId,
        lineIds: [lineId],
      }
    );

    assertNoUserErrors(data.cartLinesRemove?.userErrors);
    revalidatePath("/cart");
    return { cart: data.cartLinesRemove?.cart ?? null };
  } catch (error) {
    return {
      cart: null,
      error:
        error instanceof Error ? error.message : "Unable to remove cart line",
    };
  }
}

export async function isCartEnabled(): Promise<boolean> {
  return isShopifyConfigured();
}
