"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden md:min-h-[86vh]">
      <Image
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85"
        alt="Luxury Australian living room with premium furniture"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-charcoal/48" />

      <div className="site-container relative z-10 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
            Family Owned · Tasmania
          </p>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Premium Furniture For Tasmanian Homes
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
            Discover quality lounges, dining, bedroom and outdoor collections
            with trusted local service and delivery across Tasmania.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="brand" size="lg" asChild>
              <Link href="/collections">Shop Collections</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/55 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/showroom">Visit Showroom</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
