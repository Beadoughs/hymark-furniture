"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "living", label: "Living" },
  { id: "dining", label: "Dining" },
  { id: "bedroom", label: "Bedroom" },
  { id: "outdoor", label: "Outdoor" },
] as const;

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="section-space scroll-mt-24 bg-white">
      <div className="site-container">
        <FadeIn>
          <SectionHeading
            eyebrow="Inspiration"
            title="Gallery"
            description="Styled spaces and premium pieces — inspiration for your next room refresh."
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-sm px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.id
                    ? "bg-brand-charcoal text-white"
                    : "bg-secondary text-brand-graphite hover:bg-secondary/75"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          layout
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {filtered.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              className={cn(
                "mb-4 break-inside-avoid overflow-hidden rounded-md",
                image.height === "tall" && "sm:mb-6"
              )}
            >
              <div
                className={cn(
                  "group relative w-full overflow-hidden rounded-md",
                  image.height === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-charcoal/0 transition-colors group-hover:bg-brand-charcoal/12" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
