import { Hero } from "@/components/sections/hero";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { BestSellers } from "@/components/sections/best-sellers";
import { AboutSection } from "@/components/sections/about-section";
import { Showroom } from "@/components/sections/showroom";
import { Reviews } from "@/components/sections/reviews";
import { Newsletter } from "@/components/sections/newsletter";

export const revalidate = 10;

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <AboutSection />
      <Showroom />
      <Reviews />
      <Newsletter />
    </>
  );
}
