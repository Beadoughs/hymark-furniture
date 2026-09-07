export const NAV_LINKS = [
  { label: "Living", href: "/collections/living" },
  { label: "Dining", href: "/collections/dining" },
  { label: "Lounges", href: "/collections/lounges" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CATEGORIES = [
  {
    id: "living",
    title: "Living",
    description: "Essentials for everyday Tasmanian homes",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    href: "/collections/living",
  },
  {
    id: "dining",
    title: "Dining",
    description: "Gather around beautifully crafted tables",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    href: "/collections/dining",
  },
  {
    id: "lounges",
    title: "Lounges",
    description: "Premium comfort for every living space",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    href: "/collections/lounges",
  },
] as const;

export type Product = {
  id: string;
  handle?: string;
  variantId?: string;
  availableForSale?: boolean;
  source?: "mock" | "shopify";
  title: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  description: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "milford-3-seat",
    title: "Milford 3 Seat Leather Lounge",
    category: "Lounge",
    price: 3499,
    salePrice: 2999,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    description:
      "Full-grain leather with deep cushioning and solid timber legs. A statement piece built for everyday family living.",
    badge: "Best Seller",
  },
  {
    id: "coastal-dining-set",
    title: "Coastal Oak Dining Set — 7 Piece",
    category: "Dining",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    description:
      "Solid oak table with six upholstered dining chairs. Seats eight comfortably for weekend gatherings.",
  },
  {
    id: "heritage-recliner",
    title: "Heritage Power Recliner",
    category: "Living",
    price: 1799,
    salePrice: 1499,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    description:
      "Power recline with lumbar support and USB charging. Premium fabric in charcoal or sand.",
  },
  {
    id: "studio-desk",
    title: "Studio Executive Desk",
    category: "Living",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
    description:
      "Timber veneer desk with cable management and soft-close drawers. Pairs with matching bookcase.",
  },
  {
    id: "modular-corner",
    title: "Modular Corner Lounge — 5 Piece",
    category: "Lounge",
    price: 4299,
    salePrice: 3799,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae83?w=600&q=80",
    description:
      "Configurable modular system with chaise and ottoman. Premium fabric with stain-resistant treatment.",
    badge: "New",
  },
  {
    id: "harbour-lounge-setting",
    title: "Harbour Lounge Setting",
    category: "Lounge",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    description:
      "Relaxed lounge setting with deep cushions and timber accents. Designed for Tasmanian living.",
  },
  {
    id: "bedford-side-tables",
    title: "Bedford Side Tables — Pair",
    category: "Living",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    description:
      "Matching pair with soft-close drawers and brushed metal handles.",
  },
  {
    id: "tasman-storage-console",
    title: "Tasman Storage Console",
    category: "Living",
    price: 2199,
    salePrice: 1899,
    image:
      "https://images.unsplash.com/photo-1616594039964-40891a91a223?w=600&q=80",
    description:
      "Solid timber console with generous storage. A versatile piece for living spaces.",
    badge: "Popular",
  },
];

export const WHY_CHOOSE = [
  {
    title: "Family Owned",
    description:
      "A Tasmanian family business built on trust, integrity, and generations of furniture expertise.",
    icon: "heart" as const,
  },
  {
    title: "Quality Furniture",
    description:
      "Carefully selected ranges from trusted Australian and international brands — built to last.",
    icon: "award" as const,
  },
  {
    title: "Competitive Prices",
    description:
      "Premium quality without the premium markup. Honest pricing you can count on.",
    icon: "tag" as const,
  },
  {
    title: "Tasmania Wide Delivery",
    description:
      "Professional delivery across Tasmania — from Hobart to Launceston and everywhere between.",
    icon: "truck" as const,
  },
  {
    title: "Friendly Service",
    description:
      "Knowledgeable staff who listen, advise, and help you find furniture that truly fits your home.",
    icon: "users" as const,
  },
  {
    title: "Trusted Retailer",
    description:
      "Thousands of Tasmanian families have chosen Hymark for their homes. Your trust means everything.",
    icon: "shield" as const,
  },
] as const;

export const REVIEWS = [
  {
    id: "1",
    name: "Sarah & James M.",
    location: "Hobart, TAS",
    rating: 5,
    text: "We furnished our entire living and dining area with Hymark. The team were patient, knowledgeable, and delivery was seamless. Our lounge still looks incredible two years on.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: "2",
    name: "David L.",
    location: "Launceston, TAS",
    rating: 5,
    text: "Best furniture shopping experience we've had in Tasmania. Quality products, fair prices, and they genuinely care about getting it right for your home.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: "3",
    name: "Emma R.",
    location: "Devonport, TAS",
    rating: 5,
    text: "From showroom visit to delivery day — everything was professional. The lounge suite exceeded our expectations. Highly recommend Hymark to anyone in Tassie.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
] as const;

export const SHOWROOM = {
  address: "40 – 56 Lindsay St, Launceston TAS 7250",
  phone: "(03) 6331 7377",
  phoneTel: "+61363317377",
  email: "simon@hymarkfurniture.com.au",
  hours: [
    { day: "Monday – Friday", time: "9:00am – 5:30pm" },
    { day: "Saturday", time: "9:00am – 4:00pm" },
    { day: "Sunday", time: "10:00am – 4:00pm" },
  ],
  mapEmbed:
    "https://maps.google.com/maps?q=40%E2%80%9356%20Lindsay%20St%2C%20Launceston%20TAS%207250&z=15&output=embed",
};
