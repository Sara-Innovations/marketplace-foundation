import { categories } from "@/data/categories";
import type { Category } from "@/data/types";
import { mockRequest } from "./client";

export function getCategories(limit?: number): Promise<Category[]> {
  return mockRequest(limit ? categories.slice(0, limit) : categories);
}

export function getCategoryById(id: string): Promise<Category | undefined> {
  return mockRequest(categories.find((c) => c.id === id));
}
