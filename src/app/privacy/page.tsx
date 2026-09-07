import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Hymark Furniture collects, uses, discloses and protects personal information when you use this website.",
  openGraph: {
    title: "Privacy Policy | Hymark Furniture Tasmania",
    description:
      "Hymark Furniture’s privacy policy — how we hold, use and protect information collected on this website.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Customer Care
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              This privacy policy sets out how Hymark Furniture uses, discloses
              and protects any information that they collect when you use this
              website. The information collected is held by Hymark Furniture and
              the secure service provider.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl">
          <div className="pb-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Our Commitment
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Hymark Furniture is committed to ensuring that your privacy is
                protected. When using this website, should we ask you to provide
                certain information by which you can be identified (or your
                identity can be reasonably ascertained), then you can be assured
                that the information collected will only be held, used or
                disclosed in accordance with this privacy policy.
              </p>
            </div>
          </div>

          <div className="mt-2 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal">
              Questions about privacy?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-graphite">
              Visit us in store or call our team if you have questions about how
              we handle your information.
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
