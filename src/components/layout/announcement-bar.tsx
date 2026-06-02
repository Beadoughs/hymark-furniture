import { MapPin } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-secondary/60 py-1.5 text-center text-[11px] text-brand-graphite md:text-xs">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4">
        <span className="font-medium">
          Family Owned Australian Furniture Store
        </span>
        <span className="hidden text-brand-silver sm:inline" aria-hidden>
          |
        </span>
        <span className="inline-flex items-center gap-1.5 text-brand-graphite/80">
          <MapPin className="h-3 w-3 text-brand-graphite/70" aria-hidden />
          Delivery Across Tasmania
        </span>
      </p>
    </div>
  );
}
