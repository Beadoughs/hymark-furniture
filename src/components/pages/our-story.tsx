"use client";

import { FadeIn } from "@/components/motion/fade-in";

const TIMELINE = [
  {
    year: "1907",
    title: "Where It All Began",
    description:
      "Hymark Furniture was established in 1907 — part of the furniture industry for more than a century. Through rebranding, structural changes and evolving business practices, we have adapted while remaining committed to quality and service.",
  },
  {
    year: "1922",
    title: "Resilience Through Fire",
    description:
      "A major fire devastated the site, which at the time employed 132 people. We rebuilt and carried on — a testament to the determination that has defined us ever since.",
  },
  {
    year: "1929",
    title: "Weathering the Flood",
    description:
      "A devastating flood struck, yet the business endured. Challenges like these forged the resilience that would see us grow through decades to come.",
  },
  {
    year: "1961",
    title: "Rising Again",
    description:
      "A second fire tested us once more. Despite the setback, we continued to grow — proof that hardship has never dimmed our commitment to our customers and our craft.",
  },
  {
    year: "The Hill Family",
    title: "Four Generations of Dedication",
    description:
      "The Hill family became involved at a later stage and has guided the business through four generations. Jack Hill started at 16; his son John followed the same path. Third-generation Simon joined at 18, continuing the family's dedication. The next generation — Cooper and Piper — were involved from the ages of 7 and 8, appearing in television commercials. Cooper works in the company today.",
  },
  {
    year: "Today",
    title: "Quality That Endures",
    description:
      "Furniture is no longer manufactured on site, but every piece is produced to Hill family quality standards. Our reputation for value, craftsmanship and service endures — as it has for more than a century.",
  },
] as const;

export function OurStory() {
  return (
    <>
      <section className="section-space border-b border-border bg-secondary/20">
        <div className="site-container">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
                Hymark Furniture
              </p>
              <h1 className="mt-4 font-serif text-4xl text-brand-charcoal md:text-5xl">
                Our Story
              </h1>
              <p className="mt-5 text-base leading-relaxed text-brand-graphite md:text-lg">
                Since 1907, Hymark Furniture has been part of Tasmania&apos;s
                furniture industry — adapting through generations of change while
                never losing sight of what matters. Today, the Hill family
                continues a legacy of quality, craftsmanship and service that
                spans more than a century.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="relative mx-auto max-w-3xl">
            <div
              className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:left-[11px]"
              aria-hidden
            />

            <ol className="space-y-12 md:space-y-16">
              {TIMELINE.map((event, index) => (
                <FadeIn key={event.year} delay={index * 0.05}>
                  <li className="relative pl-10 md:pl-14">
                    <div
                      className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-brand-orange bg-white md:h-[23px] md:w-[23px]"
                      aria-hidden
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-orange md:h-2 md:w-2" />
                    </div>

                    <p className="text-sm font-semibold tracking-wide text-brand-orange md:text-base">
                      {event.year}
                    </p>
                    <h2 className="mt-1 font-serif text-xl font-medium text-brand-charcoal md:text-2xl">
                      {event.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-brand-graphite">
                      {event.description}
                    </p>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
