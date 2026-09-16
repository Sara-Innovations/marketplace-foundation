export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "popular", label: "Most popular" },
  { value: "discount", label: "Biggest discount" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export type CatalogSearch = {
  q: string;
  cat: string;
  sub: string;
  brand: string;
  vendor: string;
  min: number;
  max: number;
  rating: number;
  discount: number;
  instock: boolean;
  sort: SortKey;
  page: number;
  view: "grid" | "list";
};

export const defaultCatalogSearch: CatalogSearch = {
  q: "",
  cat: "",
  sub: "",
  brand: "",
  vendor: "",
  min: 0,
  max: 0,
  rating: 0,
  discount: 0,
  instock: false,
  sort: "featured",
  page: 1,
  view: "grid",
};

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};
const bool = (v: unknown) => v === true || v === "true";

export function validateCatalogSearch(input: Record<string, unknown>): CatalogSearch {
  const sort = str(input["sort"], "featured");
  const view = str(input["view"], "grid");
  return {
    q: str(input["q"]).slice(0, 120),
    cat: str(input["cat"]),
    sub: str(input["sub"]),
    brand: str(input["brand"]),
    vendor: str(input["vendor"]),
    min: Math.max(0, num(input["min"])),
    max: Math.max(0, num(input["max"])),
    rating: Math.min(5, Math.max(0, num(input["rating"]))),
    discount: Math.min(90, Math.max(0, num(input["discount"]))),
    instock: bool(input["instock"]),
    sort: (SORT_OPTIONS.some((o) => o.value === sort) ? sort : "featured") as SortKey,
    page: Math.max(1, Math.round(num(input["page"], 1)) || 1),
    view: view === "list" ? "list" : "grid",
  };
}

export const toList = (csv: string): string[] =>
  csv.split(",").map((s) => s.trim()).filter(Boolean);

export const toggleInCsv = (csv: string, value: string): string => {
  const list = toList(csv);
  return list.includes(value)
    ? list.filter((v) => v !== value).join(",")
    : [...list, value].join(",");
};

export function activeFilterCount(s: CatalogSearch): number {
  return (
    toList(s.cat).length +
    toList(s.sub).length +
    toList(s.brand).length +
    toList(s.vendor).length +
    (s.min > 0 ? 1 : 0) +
    (s.max > 0 ? 1 : 0) +
    (s.rating > 0 ? 1 : 0) +
    (s.discount > 0 ? 1 : 0) +
    (s.instock ? 1 : 0)
  );
}
