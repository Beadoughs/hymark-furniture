"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Navigation } from "lucide-react";
import { SHOWROOM } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Showroom() {
  return (
    <section id="showroom" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="Visit Us"
            title="Visit Tasmania's Furniture Destination"
            description="Experience our collections in person. Walk the showroom, feel the fabrics, and let our team help you find the perfect pieces."
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-md sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1618221197160-bc32a4bffa15?w=800&q=80"
                  alt="Hymark Furniture showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                  alt="Premium lounge display"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80"
                  alt="Dining furniture display"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <div>
                      <h3 className="font-semibold text-brand-charcoal">
                        Address
                      </h3>
                      <p className="mt-1 text-sm text-brand-graphite">
                        {SHOWROOM.address}
                      </p>
                      <p className="mt-1 text-xs text-brand-silver">
                        {SHOWROOM.addressNote}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <div>
                      <h3 className="font-semibold text-brand-charcoal">
                        Opening Hours
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-brand-graphite">
                        {SHOWROOM.hours.map((h) => (
                          <li
                            key={h.day}
                            className="flex justify-between gap-4"
                          >
                            <span>{h.day}</span>
                            <span className="font-medium">{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="brand" size="lg" className="w-full sm:w-auto" asChild>
                <Link href={`https://maps.google.com/?q=${encodeURIComponent(SHOWROOM.address)}`} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4" />
                  Plan Your Visit
                </Link>
              </Button>

              <div className="overflow-hidden rounded-md border border-border">
                <iframe
                  title="Hymark Furniture location map (example)"
                  src={SHOWROOM.mapEmbed}
                  className="h-56 w-full border-0 md:h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
