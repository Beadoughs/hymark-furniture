import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Website disclaimer for Hymark Furniture — accuracy of information, external links, availability, and limitation of liability.",
  openGraph: {
    title: "Disclaimer | Hymark Furniture Tasmania",
    description:
      "Important information about the use of content on the Hymark Furniture website.",
    url: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Customer Care
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              Disclaimer
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              This website has been developed by Hymark Furniture to provide
              access to information about Hymark Furniture, including text,
              images, maps and various forms of data, and to information obtained
              from external sources. All of the material published on this
              website is together referred to hereafter as &ldquo;the
              information&rdquo;.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl">
          <div className="border-b border-border pb-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Accuracy of Information
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                In those circumstances, no responsibility is accepted for the
                accuracy, completeness, or relevance to the user&apos;s purpose,
                of the information. Those using it for whatever purpose are
                advised to verify it with Hymark Furniture to obtain any
                appropriate advice.
              </p>
            </div>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Viruses &amp; Availability
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                No warranty is given that the information is free of infection by
                computer viruses or other contamination, nor that access to the
                website or any part of it will not suffer from interruption from
                time to time, without notice.
              </p>
            </div>
          </div>

          <div className="border-b border-border py-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              External Links
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Any links to other websites that have been included on this
                website are provided for your convenience only. Hymark Furniture,
                in its role as publisher of this website, does not accept any
                responsibility for the accuracy, availability, or appropriateness
                to the user&apos;s purposes, of any information or services on
                any other website.
              </p>
            </div>
          </div>

          <div className="pb-10 pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal md:text-3xl">
              Limitation of Liability
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-graphite">
              <p>
                Hymark Furniture and staff do not accept liability however
                arising, including liability for negligence, for any loss
                resulting from the use of or reliance upon the information
                and/or reliance on its availability at any time.
              </p>
            </div>
          </div>

          <div className="mt-2 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-brand-charcoal">
              Questions about this disclaimer?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-graphite">
              Visit us in store or call our team if you need to verify any
              information on this website.
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
