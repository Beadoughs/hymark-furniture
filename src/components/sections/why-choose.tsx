"use client";

import {
  Award,
  Heart,
  Shield,
  Tag,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<(typeof WHY_CHOOSE)[number]["icon"], LucideIcon> = {
  heart: Heart,
  award: Award,
  tag: Tag,
  truck: Truck,
  users: Users,
  shield: Shield,
};

export function WhyChoose() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="The Hymark Difference"
            title="Why Choose Hymark"
            description="More than a furniture store — we're your neighbours, committed to helping Tasmanian families create homes they love."
            className="[&_p]:text-brand-graphite"
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <FadeIn key={item.title} delay={index * 0.06}>
                <Card className="h-full bg-secondary/35">
                  <CardContent className="p-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-sm bg-white">
                      <Icon className="h-5 w-5 text-brand-charcoal" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-brand-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-graphite">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
