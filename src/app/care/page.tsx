import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Care",
  description:
    "How to care for your Hymark Furniture lounge — modelling after delivery, leather cleaning, and what to avoid for lasting comfort and appearance.",
  openGraph: {
    title: "Care | Hymark Furniture Tasmania",
    description:
      "Leather care, cleaning guidance and tips to keep your Hymark Furniture lounge looking its best.",
    url: "/care",
  },
};

const AVOID_ITEMS = [
  "Do not use sharp tools when removing protective wrapping.",
  "Do not lift or drag your lounge by cushions sewn into the frame — lift from the base at each end.",
  "Do not sit on armrests or backrests.",
  "Do not expose your lounge to direct sunlight, which can cause fading, drying and cracking.",
  "Keep your lounge at least 50 cm from heat sources.",
  "Never use solvents, abrasives, or shoe or saddlery care products — only use industry-recommended leather care products from Hymark Furniture.",
] as const;

export default function CarePage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Customer Care
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              Care
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              Simple guidance to protect your lounge after delivery and keep
              leather looking and feeling its best for years to come.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl">
          <div className="border-b border-border pb-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              After Delivery &amp; Modelling
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Following delivery, you may notice slight compression on the
                padding of your lounge.
              </p>
              <p>
                Straight after delivery — and regularly thereafter — it is
                necessary to model your lounge so the padding and cushions return
                to their initial appearance.
              </p>
              <p>
                Softening of padding and cushions will occur over time. This
                will cause light creasing, wrinkling and slight stretching of
                the leather, which is considered normal wear and enhances the
                look and feel of leather.
              </p>
              <p>
                Softening of seat cushions over time is completely normal and is
                not considered a defect. Sitting on one particular seat most of
                the time will cause that seat to soften more than the others.
                For even wear, alternate your choice of seat regularly.
              </p>
            </div>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Regular Care &amp; Cleaning
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Protection, Performance &amp; Bicast Leathers
            </p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                <span className="font-semibold text-brand-charcoal">
                  Regular cleaning:
                </span>{" "}
                Do not allow dust to accumulate. Weekly, wipe dust with a soft,
                damp cloth using authorised wipes from Hymark Furniture.
              </p>
              <p>
                Periodically (6–8 times per year), clean, condition and protect
                the entire leather surface using an authorised leather care kit
                from Hymark Furniture. Follow the kit instructions.
              </p>
            </div>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Food and Grease
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Protection, Performance &amp; Bicast Leathers
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-graphite">
              Remove spills immediately with a soft, non-abrasive damp cloth or
              absorbent paper, using minimal pressure and working from the
              outside of the stain toward the centre. Use an authorised leather
              care kit for further cleaning.
            </p>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Natural Leather
            </h2>
            <ul className="mt-8 space-y-8">
              <li>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
                  Regular Cleaning
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-graphite">
                  Only clean with a soft dry cloth or soft brush by dusting off
                  dirt.
                </p>
              </li>
              <li>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
                  Food and Grease
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-graphite">
                  Remove with a soft dry cloth or soft brush. Avoid greasy
                  spills, as they stain and cannot be removed effectively.
                </p>
              </li>
            </ul>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Important Things to Avoid
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-brand-graphite">
              {AVOID_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal">
              Need care products or advice?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-graphite">
              Visit us in store for authorised Hymark Furniture leather care kits
              and guidance for your specific lounge.
            </p>
            <p className="mt-2 text-sm text-brand-graphite">
              {SHOWROOM.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="brand" asChild>
                <a href={`tel:${SHOWROOM.phone.replace(/\s/g, "")}`}>
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
