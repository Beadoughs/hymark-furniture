import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Hymark Furniture warranty information under Australian Consumer Law — covering leather and fabric lounges, electrical components, timber furniture and more.",
  openGraph: {
    title: "Warranty | Hymark Furniture Tasmania",
    description:
      "Warranty periods and Australian Consumer Law guarantees for Hymark Furniture products.",
    url: "/warranty",
  },
};

const WARRANTY_PERIODS = [
  {
    title: "Leather Lounges",
    detail:
      "5 years structural, and 3 years on the leather and workmanship against failure.",
  },
  {
    title: "Fabric Lounges",
    detail:
      "3 years structural, and 18 months on the fabric and workmanship against failure.",
  },
  {
    title: "Electric, Motion & Fixed Electrical Components",
    detail:
      "Warranted against failure due to manufacturing defect for 18 months.",
  },
] as const;

export default function WarrantyPage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Customer Care
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              Warranty
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              Hymark Furniture applies warranty on the basis that you are deemed
              a &lsquo;consumer&rsquo; under Australian Consumer Law.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-graphite md:text-lg">
              Our goods come with guarantees that cannot be excluded under the
              Australian Consumer Law. You are entitled to a replacement or
              refund for a major failure; you are also entitled to have the
              goods repaired or replaced if the goods fail and the failure does
              not amount to a major failure.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl">
          <div className="border-b border-border pb-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              A Note on Guarantees
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-graphite">
              In general, each piece of furniture will have its own guarantee
              and time pending product range, product and price. Please check in
              store.
            </p>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Warranty Periods
            </h2>
            <ul className="mt-8 space-y-8">
              {WARRANTY_PERIODS.map((item) => (
                <li key={item.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-brand-graphite">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Wear &amp; Tear and Natural Characteristics
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Leather, fabric, motion actions, cushioning and fillings will
                show signs of wear and tear with use. You should not be alarmed
                — your lounge is new and has only been sat on once by Quality
                Agents in testing.
              </p>
              <p>
                Fabrics and leathers will fade and crease; foam and fillings
                will soften and form to the shape of the user over time. The
                amount depends on the covering and the degree of use.
              </p>
              <p>
                These, along with scars, marks, differing pore density and
                colour, are natural characteristics of leather and should not be
                considered defects.
              </p>
            </div>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Other Products
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Timber furniture — please check in store. As a general guide, the
                guarantee is 12 months.
              </p>
              <p>
                All other items: please check in store for individual
                guarantees.
              </p>
            </div>
          </div>

          <div className="py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Claims &amp; Notification
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Hymark Furniture reserves the right to decide whether the
                components should be repaired or replaced.
              </p>
              <p>
                Hymark Furniture needs to be notified of any defect within 10
                days of the defect occurring.
              </p>
            </div>
          </div>

          <div className="mt-2 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal">
              Questions about warranty?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-graphite">
              Visit us in store or call our team for product-specific guarantee
              details.
            </p>
            <p className="mt-2 text-sm text-brand-graphite">
              {SHOWROOM.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="brand" asChild>
                <a href={`tel:${SHOWROOM.phoneTel}`}>
                  <Phone className="h-4 w-4" />
                  {SHOWROOM.phone}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
