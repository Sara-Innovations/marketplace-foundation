import { products } from "@/data/products";
import type { CartItem, Product } from "@/data/types";
import { mockRequest } from "./client";

export type CartLine = { product: Product; quantity: number; lineTotal: number };

export type CartSummary = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
};

export function summarizeCart(items: CartItem[]): CartSummary {
  const lines: CartLine[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity, lineTotal: product.price * item.quantity };
    })
    .filter(Boolean) as CartLine[];

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const savings = lines.reduce(
    (sum, l) => sum + ((l.product.compareAtPrice ?? l.product.price) - l.product.price) * l.quantity,
    0,
  );
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const shipping = subtotal === 0 || subtotal > 75 ? 0 : 6.95;

  return { lines, itemCount, subtotal, savings, shipping, total: subtotal + shipping };
}

export function getCart(items: CartItem[]): Promise<CartSummary> {
  return mockRequest(summarizeCart(items));
}
