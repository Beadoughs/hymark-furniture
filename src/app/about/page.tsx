import type { Metadata } from "next";
import { OurStory } from "@/components/pages/our-story";
import { WhyChoose } from "@/components/sections/why-choose";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover the Hymark Furniture heritage — established in 1907 and guided by four generations of the Hill family, with a lasting commitment to quality and service.",
};

export default function AboutPage() {
  return (
    <>
      <OurStory />
      <WhyChoose />
    </>
  );
}
