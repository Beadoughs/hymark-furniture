import { Hero } from "@/components/sections/hero";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { BestSellers } from "@/components/sections/best-sellers";
import { WhyChoose } from "@/components/sections/why-choose";
import { AboutSection } from "@/components/sections/about-section";
import { Showroom } from "@/components/sections/showroom";
import { Reviews } from "@/components/sections/reviews";
import { Gallery } from "@/components/sections/gallery";
import { Newsletter } from "@/components/sections/newsletter";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <WhyChoose />
      <AboutSection />
      <Showroom />
      <Reviews />
      <Gallery />
      <Newsletter />
    </>
  );
}
