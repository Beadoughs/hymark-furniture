import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCart, isCartEnabled } from "@/lib/shopify/cart-actions";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartLineControls } from "@/components/cart/cart-line-controls";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your Hymark Furniture cart and proceed to secure Shopify checkout.",
};

export default async function CartPage() {
  const enabled = await isCartEnabled();
  const cart = enabled ? await getCart() : null;
  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];

  return (
    <section className="section-space bg-white">
      <div className="site-container max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand-graphite">
            Shopping
          </p>
          <h1 className="mt-2 font-serif text-4xl text-brand-charcoal md:text-5xl">
            Your Cart
          </h1>
        </div>

        {!enabled ? (
          <div className="rounded-md border border-border bg-secondary/30 p-8 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-brand-silver" />
            <h2 className="mt-4 font-serif text-2xl text-brand-charcoal">
              Demo mode
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-graphite">
              Connect Shopify Storefront API credentials to enable online cart and
              checkout. Until then, browse collections and visit our showroom.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="brand" asChild>
                <Link href="/collections/living">Browse Collections</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/showroom">Visit Showroom</Link>
              </Button>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="rounded-md border border-border bg-secondary/30 p-8 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-brand-silver" />
            <h2 className="mt-4 font-serif text-2xl text-brand-charcoal">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-graphite">
              Discover premium lounges, dining settings, bedroom suites and more.
            </p>
            <Button variant="brand" className="mt-6" asChild>
              <Link href="/collections/living">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <ul className="space-y-5">
              {lines.map((line) => {
                const imageUrl = line.merchandise.image?.url;
                return (
                  <li
                    key={line.id}
                    className="flex gap-4 border-b border-border pb-5"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-secondary/70">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-brand-silver" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-medium text-brand-charcoal">
                        {line.merchandise.product.title}
                      </h2>
                      <p className="mt-1 text-sm text-brand-graphite">
                        {formatMoney(line.merchandise.price)}
                      </p>
                      <div className="mt-3">
                        <CartLineControls
                          lineId={line.id}
                          quantity={line.quantity}
                        />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-brand-charcoal">
                      {formatMoney({
                        amount: String(
                          parseFloat(line.merchandise.price.amount) *
                            line.quantity
                        ),
                        currencyCode: line.merchandise.price.currencyCode,
                      })}
                    </p>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit rounded-md border border-border bg-secondary/20 p-6">
              <h2 className="font-serif text-xl text-brand-charcoal">Summary</h2>
              <div className="mt-4 flex items-center justify-between text-sm">
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
              {cart?.checkoutUrl ? (
                <Button variant="brand" className="mt-6 w-full" asChild>
                  <a href={cart.checkoutUrl}>Proceed to Checkout</a>
                </Button>
              ) : null}
              <Button variant="outline" className="mt-3 w-full" asChild>
                <Link href="/collections/living">Continue Shopping</Link>
              </Button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
