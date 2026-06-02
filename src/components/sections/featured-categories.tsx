"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedCategories() {
  return (
    <section id="categories" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="Collections"
            title="Featured Categories"
            description="Explore our curated ranges — from statement lounges to outdoor entertaining, every piece chosen for quality and lasting style."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <FadeIn key={category.id} delay={index * 0.08}>
              <Link href={category.href} className="group block">
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[3/4]"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="font-serif text-2xl font-medium text-white md:text-[1.9rem]">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/78">{category.description}</p>
                  </div>
                </motion.article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
