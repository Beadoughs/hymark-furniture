"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="section-space scroll-mt-24 bg-secondary/25">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Hymark Furniture showroom interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="More Than a Century of Craft"
              description="Established in 1907 and guided by four generations of the Hill family — a Tasmanian furniture tradition built on quality, value and genuine care."
            />
            <div className="space-y-4 text-base leading-relaxed text-brand-graphite/95">
              <p>
                From a major fire in 1922 to floods, rebranding and evolving
                business practices, Hymark has adapted through every challenge
                while never compromising on the standards our customers expect.
              </p>
              <p>
                Today, Cooper Hill carries the family dedication forward —
                continuing a legacy that began when his great-grandfather Jack
                started at just 16 years old.
              </p>
            </div>
            <Button variant="outline" className="mt-8" asChild>
              <Link href="/about">
                Read our full story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
