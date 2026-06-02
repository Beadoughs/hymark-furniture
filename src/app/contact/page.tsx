import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { Showroom } from "@/components/sections/showroom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hymark Furniture for showroom enquiries, delivery support and product guidance across Tasmania.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
              Contact Hymark
            </p>
            <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
              We&apos;re Here To Help
            </h1>
            <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
              Speak with our friendly team for product advice, stock checks,
              delivery information or styling support.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl text-brand-charcoal">Call Us</h2>
                <p className="mt-2 text-sm text-brand-graphite">
                  Monday to Sunday during showroom opening hours.
                </p>
                <Button variant="brand" className="mt-5 w-full sm:w-auto" asChild>
                  <a href={`tel:${SHOWROOM.phone.replace(/\s/g, "")}`}>
                    <Phone className="h-4 w-4" />
                    {SHOWROOM.phone}
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl text-brand-charcoal">Email Us</h2>
                <p className="mt-2 text-sm text-brand-graphite">
                  Send through your enquiry and we&apos;ll respond promptly.
                </p>
                <Button variant="outline" className="mt-5 w-full sm:w-auto" asChild>
                  <a href={`mailto:${SHOWROOM.email}`}>
                    <Mail className="h-4 w-4" />
                    {SHOWROOM.email}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button variant="ghost" asChild>
              <Link href="/showroom">View showroom details and directions</Link>
            </Button>
          </div>
        </div>
      </section>

      <Showroom />
    </>
  );
}
