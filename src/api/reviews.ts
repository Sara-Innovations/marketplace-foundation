import { reviews } from "@/data/reviews";
import type { Review } from "@/data/types";
import { mockRequest } from "./client";

export type ReviewSummary = {
  average: number;
  total: number;
  breakdown: { stars: number; count: number; percent: number }[];
  items: Review[];
};

export function getProductReviews(productId: string): Promise<ReviewSummary> {
  const items = reviews.filter((r) => r.productId === productId);
  const total = items.length;
  const average = total ? items.reduce((s, r) => s + r.rating, 0) / total : 0;
  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = items.filter((r) => r.rating === stars).length;
    return { stars, count, percent: total ? Math.round((count / total) * 100) : 0 };
  });
  return mockRequest({ average, total, breakdown, items });
}
