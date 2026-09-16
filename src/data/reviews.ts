import type { Review } from "./types";
import { products } from "./products";

const img = (id: string, w = 300) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const authors = [
  "Amelia R.",
  "Jonas K.",
  "Priya S.",
  "Marcus D.",
  "Lena W.",
  "Tomás G.",
  "Hannah B.",
  "Yuki N.",
];

const avatars = [
  "photo-1494790108377-be9c29b29330",
  "photo-1500648767791-00dcc994a43e",
  "photo-1534528741775-53994a69daeb",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1517841905240-472988babdf9",
  "photo-1502685104226-ee32379fefbe",
];

const reviewImages = [
  "photo-1505740420928-5e560c06d30e",
  "photo-1523275335684-37898b6baf30",
  "photo-1542291026-7eec264c27ff",
  "photo-1556228453-efd6c1ff04f6",
];

const titles = [
  "Exactly what I hoped for",
  "Great value for the price",
  "Solid quality, fast shipping",
  "Better than expected",
  "Good, with one small niggle",
  "Would buy again",
];

const bodies = [
  "Arrived two days early and the packaging was spotless. Build quality feels well above the price point and the seller answered my question within an hour.",
  "I've used it daily for three weeks now and it still looks brand new. Colour matches the photos closely, which is rare.",
  "Does the job nicely. Not perfect — the finish picks up fingerprints — but for the money I'd happily order from this store again.",
  "The store threw in a handwritten note, which was a lovely touch. Product performs exactly as described in the listing.",
  "Second one I've bought. First went to my brother after he kept borrowing mine. That should tell you enough.",
  "Shipping took a little longer than estimated but support kept me updated the whole way. The item itself is excellent.",
];

function makeReviews(productId: string, seed: number, rating: number): Review[] {
  const count = 3 + (seed % 3);
  return Array.from({ length: count }, (_, i) => {
    const k = seed + i * 7;
    const stars = Math.max(3, Math.min(5, Math.round(rating + (i % 3) - 1)));
    return {
      id: `${productId}-r${i + 1}`,
      productId,
      author: authors[k % authors.length]!,
      avatar: img(avatars[k % avatars.length]!, 120),
      rating: stars,
      title: titles[k % titles.length]!,
      body: bodies[k % bodies.length]!,
      date: new Date(Date.UTC(2026, (k % 9) + 1, (k % 27) + 1)).toISOString(),
      verified: k % 4 !== 0,
      helpful: (k * 13) % 48,
      images: i === 0 ? [img(reviewImages[k % reviewImages.length]!)] : [],
    };
  });
}

export const reviews: Review[] = products.flatMap((p, i) =>
  makeReviews(p.id, i + 3, p.rating),
);
