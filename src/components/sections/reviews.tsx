"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-brand-orange text-brand-orange"
        />
      ))}
    </div>
  );
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Reviews() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            description="Real reviews from Tasmanian families who've made Hymark their furniture destination."
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <FadeIn key={review.id} delay={index * 0.08}>
              <Card className="h-full bg-secondary/30">
                <CardContent className="flex h-full flex-col p-7">
                  <StarRating count={review.rating} />
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-brand-graphite">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-charcoal/90 text-sm font-semibold tracking-wide text-white"
                      aria-hidden
                    >
                      {initialsFromName(review.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal">
                        {review.name}
                      </p>
                      <p className="text-sm text-brand-silver">
                        Verified customer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
