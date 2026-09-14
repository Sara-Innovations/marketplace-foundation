import type { FlashSale } from "./types";
import { products } from "./products";

// Rolling 8-hour window so the countdown always has time left.
const endsAt = () => {
  const now = new Date();
  const end = new Date(now.getTime());
  end.setUTCHours(23, 59, 59, 0);
  if (end.getTime() - now.getTime() < 60 * 60 * 1000) {
    end.setUTCDate(end.getUTCDate() + 1);
  }
  return end.toISOString();
};

export const flashSales: FlashSale[] = [
  {
    id: "fs-today",
    title: "Flash Deals",
    subtitle: "Hand-picked markdowns from verified sellers. Ends at midnight.",
    endsAt: endsAt(),
    productIds: products.filter((p) => p.tags.includes("flash")).map((p) => p.id),
  },
];
