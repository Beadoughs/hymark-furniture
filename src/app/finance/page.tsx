import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Finance Options",
  description:
    "24 months interest free on furniture at Hymark Furniture Tasmania. Enjoy your purchase today and manage payments over 24 months. Conditions apply.",
  openGraph: {
    title: "Finance Options | Hymark Furniture Tasmania",
    description:
      "24 months interest free finance available at Hymark Furniture. Call (03) 6331 7377 for details. Conditions apply.",
    url: "/finance",
  },
};

export default function FinancePage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Customer Care
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              Finance Options
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              We offer 24 Months Interest Free so you can enjoy your purchase
              today and manage your payments over the next 24 months.
            </p>
            <p className="mt-3 text-sm font-medium text-brand-charcoal">
              Conditions Apply.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl">
          <div className="pb-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              How it works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-graphite">
              Spread the cost of quality furniture across 24 months with no
              interest. Speak with our showroom team for eligibility, terms, and
              the right option for your purchase.
            </p>
          </div>

          <div className="mt-2 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal">
              Want to know more?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-graphite">
              For further details contact us on{" "}
              <a
                href={`tel:${SHOWROOM.phoneTel}`}
                className="font-medium text-brand-charcoal underline-offset-2 hover:underline"
              >
                {SHOWROOM.phone}
              </a>
              , or visit our Launceston showroom.
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-brand-graphite">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-charcoal" />
              {SHOWROOM.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="brand" asChild>
                <a href={`tel:${SHOWROOM.phoneTel}`}>
                  <Phone className="h-4 w-4" />
                  Call {SHOWROOM.phone}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/showroom">Visit Showroom</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
