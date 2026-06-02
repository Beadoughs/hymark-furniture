"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="section-space border-y border-border bg-secondary/20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-graphite">
            Stay Connected
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-brand-charcoal md:text-4xl">
            Join The Hymark Family
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-graphite">
            Be the first to hear about new arrivals, exclusive offers, and
            styling inspiration for your Tasmanian home.
          </p>

          {submitted ? (
            <p className="mt-8 rounded-md border border-border bg-white px-6 py-4 text-brand-charcoal">
              Thank you for subscribing! Welcome to the Hymark family.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 flex-1 border-border bg-white text-brand-charcoal placeholder:text-brand-silver focus-visible:ring-brand-charcoal"
                aria-label="Email address"
              />
              <Button type="submit" variant="brand" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
