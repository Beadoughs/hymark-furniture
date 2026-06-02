"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-colors duration-200",
        scrolled
          ? "border-border bg-white/95 backdrop-blur-sm"
          : "bg-white"
      )}
    >
      <div className="site-container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="relative h-8 w-44 shrink-0 md:h-9 md:w-52">
          <Image
            src="/logo.svg"
            alt="Hymark Furniture"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-sm px-3 py-2 text-sm font-medium text-brand-graphite transition-colors hover:text-brand-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="brand"
            size="default"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/showroom">Visit Showroom</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-sm px-4 py-3 text-lg font-medium text-brand-charcoal transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="brand" size="lg" className="mt-6 w-full" asChild>
                  <Link href="/showroom" onClick={() => setOpen(false)}>
                    Visit Showroom
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
