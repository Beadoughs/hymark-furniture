import type { Metadata } from "next";
import { Showroom } from "@/components/sections/showroom";
import { Reviews } from "@/components/sections/reviews";

export const metadata: Metadata = {
  title: "Visit Showroom",
  description:
    "Plan your visit to Hymark Furniture showroom in Tasmania. View address, opening hours and directions.",
};

export default function ShowroomPage() {
  return (
    <>
      <Showroom />
      <Reviews />
    </>
  );
}
