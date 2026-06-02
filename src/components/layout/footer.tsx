import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { NAV_LINKS, SHOWROOM } from "@/lib/data";

const FOOTER_LINKS = {
  shop: [
    { label: "Living", href: "/collections/living" },
    { label: "Dining", href: "/collections/dining" },
    { label: "Bedroom", href: "/collections/bedroom" },
    { label: "Outdoor", href: "/collections/outdoor" },
    { label: "Clearance", href: "/collections/clearance" },
  ],
  care: [
    { label: "Delivery Information", href: "/showroom" },
    { label: "Finance Options", href: "/contact" },
    { label: "Care & Maintenance", href: "/about" },
    { label: "Warranty", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-white text-brand-charcoal">
      <div className="site-container py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="relative mb-6 inline-block h-9 w-48">
              <Image
                src="/logo.svg"
                alt="Hymark Furniture"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-brand-graphite">
              Tasmania&apos;s trusted family-owned furniture destination. Quality
              furniture, competitive prices, and service you can count on.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2.5 text-brand-graphite transition-colors hover:border-brand-charcoal hover:text-brand-charcoal"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2.5 text-brand-graphite transition-colors hover:border-brand-charcoal hover:text-brand-charcoal"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-graphite transition-colors hover:text-brand-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Customer Care
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.care.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-graphite transition-colors hover:text-brand-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(5).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-graphite transition-colors hover:text-brand-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-brand-graphite">
              <li>
                <a
                  href={`tel:${SHOWROOM.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-brand-charcoal"
                >
                  <Phone className="h-4 w-4 text-brand-charcoal" />
                  {SHOWROOM.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SHOWROOM.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-brand-charcoal"
                >
                  <Mail className="h-4 w-4 text-brand-charcoal" />
                  {SHOWROOM.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {SHOWROOM.address}
                <br />
                <span className="text-xs text-brand-silver">
                  {SHOWROOM.addressNote}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-brand-graphite md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Hymark Furniture. All rights
            reserved.
          </p>
          <p className="text-center md:text-right">
            Furniture Tasmania · Furniture Store Tasmania · Furniture Delivery
            Tasmania
          </p>
        </div>
      </div>
    </footer>
  );
}
