"use client";

import Link from "next/link";
import { Phone, MapPin, Store } from "lucide-react";
import { SHOWROOM } from "@/lib/data";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur-sm md:hidden">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href={`tel:${SHOWROOM.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center gap-1 py-3 text-brand-graphite transition-colors active:bg-secondary"
        >
          <Phone className="h-5 w-5 text-brand-orange" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            Call
          </span>
        </a>
        <Link
          href="/showroom"
          className="flex flex-col items-center gap-1 py-3 text-brand-graphite transition-colors active:bg-secondary"
        >
          <MapPin className="h-5 w-5 text-brand-orange" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            Directions
          </span>
        </Link>
        <Link
          href="/showroom"
          className="flex flex-col items-center gap-1 py-3 text-brand-charcoal transition-colors active:bg-secondary"
        >
          <Store className="h-5 w-5 text-brand-orange" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            Showroom
          </span>
        </Link>
      </div>
    </div>
  );
}
