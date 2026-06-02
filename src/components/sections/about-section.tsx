"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

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
              title="A Tasmanian Family Tradition"
              description=""
            />
            <div className="space-y-4 text-base leading-relaxed text-brand-graphite/95">
              <p>
                Hymark Furniture began as a small family business with a simple
                belief: every Tasmanian home deserves furniture that&apos;s built
                to last, fairly priced, and sold by people who genuinely care.
              </p>
              <p>
                For generations, we&apos;ve built relationships — not just
                transactions. We know our customers by name, we understand the
                unique character of Tasmanian homes, and we take pride in helping
                families find pieces they&apos;ll love for years to come.
              </p>
              <p>
                From our showroom floor to your living room, quality and trust
                guide everything we do. That&apos;s the Hymark promise.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
