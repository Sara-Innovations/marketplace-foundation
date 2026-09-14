import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { mockRequest } from "./client";

export type ProductFilter = "trending" | "best-seller" | "new" | "flash" | "all";

export function getProducts(filter: ProductFilter = "all", limit = 12): Promise<Product[]> {
  const list = filter === "all" ? products : products.filter((p) => p.tags.includes(filter));
  return mockRequest(list.slice(0, limit));
}

export function getProductById(id: string): Promise<Product | undefined> {
  return mockRequest(products.find((p) => p.id === id));
}

export function getProductsByIds(ids: string[]): Promise<Product[]> {
  return mockRequest(ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]);
}

export function searchProducts(term: string): Promise<Product[]> {
  const q = term.trim().toLowerCase();
  if (!q) return mockRequest([]);
  return mockRequest(products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8));
}
