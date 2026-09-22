import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";
import type { Product } from "@/data/types";
import { discountPercent } from "@/lib/format";
import { toList, type CatalogSearch } from "@/lib/search-params";
import { mockRequest } from "./client";

export const PAGE_SIZE = 12;

export type CatalogScope = {
  categoryId?: string;
  vendorId?: string;
};

export type Facet = { value: string; label: string; count: number };

export type CatalogResult = {
  items: Product[];
  total: number;
  page: number;
  pageCount: number;
  facets: {
    categories: Facet[];
    subcategories: Facet[];
    brands: Facet[];
    vendors: Facet[];
    priceMin: number;
    priceMax: number;
  };
};

function baseSet(scope: CatalogScope): Product[] {
  return products.filter(
    (p) =>
      (!scope.categoryId || p.categoryId === scope.categoryId) &&
      (!scope.vendorId || p.vendorId === scope.vendorId),
  );
}

function matches(p: Product, s: CatalogSearch): boolean {
  const cats = toList(s.cat);
  const subs = toList(s.sub);
  const brands = toList(s.brand);
  const vends = toList(s.vendor);
  const q = s.q.trim().toLowerCase();

  if (q) {
    const hay = `${p.name} ${p.brand} ${p.subcategory}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (cats.length && !cats.includes(p.categoryId)) return false;
  if (subs.length && !subs.includes(p.subcategory)) return false;
  if (brands.length && !brands.includes(p.brand)) return false;
  if (vends.length && !vends.includes(p.vendorId)) return false;
  if (s.min > 0 && p.price < s.min) return false;
  if (s.max > 0 && p.price > s.max) return false;
  if (s.rating > 0 && p.rating < s.rating) return false;
  if (s.discount > 0 && discountPercent(p.price, p.compareAtPrice) < s.discount) return false;
  if (s.instock && p.stock <= 0) return false;
  return true;
}

function sortProducts(list: Product[], sort: CatalogSearch["sort"]): Product[] {
  const out = [...list];
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "rating":
      return out.sort((a, b) => b.rating - a.rating);
    case "popular":
      return out.sort((a, b) => b.sold - a.sold);
    case "discount":
      return out.sort(
        (a, b) =>
          discountPercent(b.price, b.compareAtPrice) - discountPercent(a.price, a.compareAtPrice),
      );
    default:
      return out.sort(
        (a, b) => Number(b.tags.includes("trending")) - Number(a.tags.includes("trending")),
      );
  }
}

function countBy(list: Product[], pick: (p: Product) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const p of list) {
    const key = pick(p);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

export function queryCatalog(
  search: CatalogSearch,
  scope: CatalogScope = {},
): Promise<CatalogResult> {
  const base = baseSet(scope);
  const filtered = base.filter((p) => matches(p, search));
  const sorted = sortProducts(filtered, search.sort);
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(search.page, pageCount);
  const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const catCounts = countBy(base, (p) => p.categoryId);
  const subCounts = countBy(base, (p) => p.subcategory);
  const brandCounts = countBy(base, (p) => p.brand);
  const vendorCounts = countBy(base, (p) => p.vendorId);
  const prices = base.map((p) => p.price);

  return mockRequest({
    items,
    total: sorted.length,
    page,
    pageCount,
    facets: {
      categories: [...catCounts].map(([value, count]) => ({
        value,
        label: categories.find((c) => c.id === value)?.name ?? value,
        count,
      })),
      subcategories: [...subCounts].map(([value, count]) => ({ value, label: value, count })),
      brands: [...brandCounts].map(([value, count]) => ({ value, label: value, count })),
      vendors: [...vendorCounts].map(([value, count]) => ({
        value,
        label: vendors.find((v) => v.id === value)?.name ?? value,
        count,
      })),
      priceMin: prices.length ? Math.floor(Math.min(...prices)) : 0,
      priceMax: prices.length ? Math.ceil(Math.max(...prices)) : 0,
    },
  });
}

export type Suggestions = {
  products: Product[];
  categories: { name: string; slug: string }[];
  vendors: { name: string; slug: string; logo: string; verified: boolean }[];
};

export function getSuggestions(term: string): Promise<Suggestions> {
  const q = term.trim().toLowerCase();
  if (!q) return mockRequest({ products: [], categories: [], vendors: [] }, 60);
  return mockRequest(
    {
      products: products
        .filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(q))
        .slice(0, 5),
      categories: categories
        .filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.children?.some((ch) => ch.toLowerCase().includes(q)),
        )
        .slice(0, 4)
        .map((c) => ({ name: c.name, slug: c.slug })),
      vendors: vendors
        .filter((v) => v.name.toLowerCase().includes(q))
        .slice(0, 3)
        .map((v) => ({ name: v.name, slug: v.slug, logo: v.logo, verified: v.verified })),
    },
    120,
  );
}

export const POPULAR_SEARCHES = [
  "headphones",
  "sneakers",
  "smartwatch",
  "coffee",
  "serum",
  "backpack",
];
