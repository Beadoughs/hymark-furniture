import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { NAV_LINKS, SHOWROOM } from "@/lib/data";

const FOOTER_LINKS = {
  shop: [
    { label: "Living", href: "/collections/living" },
    { label: "Dining", href: "/collections/dining" },
    { label: "Lounges", href: "/collections/lounges" },
  ],
  care: [
    { label: "Finance Options", href: "/finance" },
    { label: "Warranty", href: "/warranty" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-orange text-white">
      <div className="site-container py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="max-w-xs text-sm leading-relaxed text-white/85">
              Tasmania&apos;s trusted family-owned furniture destination. Quality
              furniture, competitive prices, and service you can count on.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/35 p-2.5 text-white transition-colors hover:border-white hover:bg-white/10"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/35 p-2.5 text-white transition-colors hover:border-white hover:bg-white/10"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Customer Care
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.care.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(3).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-white/85">
              <li>
                <a
                  href={`tel:${SHOWROOM.phoneTel}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-white" />
                  {SHOWROOM.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SHOWROOM.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-white" />
                  {SHOWROOM.email}
                </a>
              </li>
              <li className="leading-relaxed">{SHOWROOM.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/25 pt-8 text-xs text-white/75 md:flex-row">
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
