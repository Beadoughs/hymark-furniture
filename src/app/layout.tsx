import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCta } from "@/components/layout/mobile-cta";
import { SHOWROOM } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.hymarkfurniture.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Hymark Furniture | Premium Furniture Store Tasmania — Lounges, Dining & Bedroom",
    template: "%s | Hymark Furniture Tasmania",
  },
  description:
    "Tasmania's trusted family-owned furniture store. Premium lounges, dining furniture, bedroom suites and outdoor settings with delivery across Tasmania. Visit our showroom today.",
  keywords: [
    "Furniture Tasmania",
    "Furniture Store Tasmania",
    "Lounges Tasmania",
    "Dining Furniture Tasmania",
    "Bedroom Furniture Tasmania",
    "Furniture Delivery Tasmania",
    "Hymark Furniture",
    "furniture Hobart",
    "furniture Launceston",
  ],
  authors: [{ name: "Hymark Furniture" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Hymark Furniture",
    title:
      "Hymark Furniture | Premium Furniture Store Tasmania",
    description:
      "Family-owned Tasmanian furniture retailer. Premium lounges, dining, bedroom & outdoor furniture with statewide delivery.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Hymark Furniture — Premium Tasmanian living room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hymark Furniture | Premium Furniture Tasmania",
    description:
      "Family-owned furniture store with delivery across Tasmania. Lounges, dining, bedroom & outdoor.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Hymark Furniture",
  description:
    "Family-owned premium furniture retailer serving Tasmania with lounges, dining, bedroom and outdoor furniture.",
  url: siteUrl,
  telephone: SHOWROOM.phone,
  email: SHOWROOM.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Example Street",
    addressLocality: "Hobart",
    addressRegion: "TAS",
    postalCode: "7000",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -42.8821,
    longitude: 147.3272,
  },
  areaServed: {
    "@type": "State",
    name: "Tasmania",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/hymarkfurniture",
    "https://www.instagram.com/hymarkfurniture",
  ],
  note: "Example address and coordinates for demonstration purposes only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AnnouncementBar />
        <CartProvider>
          <Header />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileCta />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
