import { flashSales } from "@/data/flashSales";
import { products } from "@/data/products";
import type { FlashSale, Product } from "@/data/types";
import { mockRequest } from "./client";

export function getActiveFlashSale(): Promise<{ sale: FlashSale; products: Product[] }> {
  const sale = flashSales[0]!;
  const list = sale.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
  return mockRequest({ sale, products: list });
}
