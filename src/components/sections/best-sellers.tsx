import { getBestSellerProducts } from "@/lib/products";
import { BestSellersGrid } from "@/components/sections/best-sellers-grid";

export async function BestSellers() {
  const products = await getBestSellerProducts(8);

  return <BestSellersGrid products={products} />;
}
