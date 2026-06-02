import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { WhyChoose } from "@/components/sections/why-choose";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hymark Furniture, Tasmania's trusted family-owned furniture destination and our commitment to quality service.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <WhyChoose />
    </>
  );
}
