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

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductBySlug(slug: string): Promise<Product | undefined> {
  return mockRequest(products.find((p) => p.slug === slug));
}

export function getProductsByIds(ids: string[]): Promise<Product[]> {
  return mockRequest(
    ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[],
  );
}

export function searchProducts(term: string): Promise<Product[]> {
  const q = term.trim().toLowerCase();
  if (!q) return mockRequest([]);
  return mockRequest(products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8));
}

export type ProductRelations = {
  related: Product[];
  similar: Product[];
  bundle: Product[];
};

export function getProductRelations(product: Product): Promise<ProductRelations> {
  const related = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 5);
  const similar = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categoryId !== product.categoryId &&
        Math.abs(p.price - product.price) < Math.max(80, product.price * 0.6),
    )
    .slice(0, 5);
  const fromStore = products.filter((p) => p.id !== product.id && p.vendorId === product.vendorId);
  const bundle = [product, ...(fromStore.length ? fromStore : related)].slice(0, 3);
  return mockRequest({ related, similar, bundle });
}
