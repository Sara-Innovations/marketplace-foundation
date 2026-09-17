import { Star } from "lucide-react";
import type { CatalogResult } from "@/api/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  activeFilterCount,
  toList,
  toggleInCsv,
  type CatalogSearch,
} from "@/lib/search-params";

export type FilterPatch = Partial<CatalogSearch>;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground">{title}</p>
      {children}
    </div>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-border accent-[var(--primary)]"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted-foreground">{count}</span>}
    </label>
  );
}

export function FilterSidebar({
  search,
  facets,
  onChange,
  hide = [],
  className,
}: {
  search: CatalogSearch;
  facets: CatalogResult["facets"] | undefined;
  onChange: (patch: FilterPatch) => void;
  hide?: ("categories" | "vendors")[];
  className?: string;
}) {
  const priceSteps: [number, number][] = [
    [0, 50],
    [50, 150],
    [150, 400],
    [400, 1000],
    [1000, 0],
  ];

  return (
    <aside className={cn("w-full", className)}>
      <div className="flex items-center justify-between pb-2">
        <p className="font-display text-base font-bold">Filters</p>
        {activeFilterCount(search) > 0 && (
          <button
            type="button"
            onClick={() =>
              onChange({
                cat: "",
                sub: "",
                brand: "",
                vendor: "",
                min: 0,
                max: 0,
                rating: 0,
                discount: 0,
                instock: false,
                page: 1,
              })
            }
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {!hide.includes("categories") && !!facets?.categories.length && (
        <Group title="Categories">
          {facets.categories.map((f) => (
            <Check
              key={f.value}
              label={f.label}
              count={f.count}
              checked={toList(search.cat).includes(f.value)}
              onChange={() => onChange({ cat: toggleInCsv(search.cat, f.value), page: 1 })}
            />
          ))}
        </Group>
      )}

      {!!facets?.subcategories.length && (
        <Group title="Subcategories">
          {facets.subcategories.map((f) => (
            <Check
              key={f.value}
              label={f.label}
              count={f.count}
              checked={toList(search.sub).includes(f.value)}
              onChange={() => onChange({ sub: toggleInCsv(search.sub, f.value), page: 1 })}
            />
          ))}
        </Group>
      )}

      <Group title="Price">
        <div className="space-y-1">
          {priceSteps.map(([min, max]) => {
            const checked = search.min === min && search.max === max;
            return (
              <Check
                key={`${min}-${max}`}
                label={max === 0 ? `${formatPrice(min)}+` : `${formatPrice(min)} – ${formatPrice(max)}`}
                checked={checked}
                onChange={() =>
                  onChange(checked ? { min: 0, max: 0, page: 1 } : { min, max, page: 1 })
                }
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min={0}
            aria-label="Minimum price"
            placeholder="Min"
            value={search.min || ""}
            onChange={(e) => onChange({ min: Number(e.target.value) || 0, page: 1 })}
            className="h-9 w-full rounded-lg border border-border bg-card px-2.5 text-sm outline-none focus:border-primary"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            min={0}
            aria-label="Maximum price"
            placeholder="Max"
            value={search.max || ""}
            onChange={(e) => onChange({ max: Number(e.target.value) || 0, page: 1 })}
            className="h-9 w-full rounded-lg border border-border bg-card px-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </Group>

      {!!facets?.brands.length && (
        <Group title="Brands">
          {facets.brands.map((f) => (
            <Check
              key={f.value}
              label={f.label}
              count={f.count}
              checked={toList(search.brand).includes(f.value)}
              onChange={() => onChange({ brand: toggleInCsv(search.brand, f.value), page: 1 })}
            />
          ))}
        </Group>
      )}

      <Group title="Rating">
        <div className="space-y-1">
          {[4.5, 4, 3.5, 3].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ rating: search.rating === r ? 0 : r, page: 1 })}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface",
                search.rating === r && "bg-surface font-semibold",
              )}
            >
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className={cn("size-3.5", i < Math.round(r) ? "fill-primary text-primary" : "text-border")}
                    strokeWidth={1.5}
                  />
                ))}
              </span>
              {r.toFixed(1)} &amp; up
            </button>
          ))}
        </div>
      </Group>

      <Group title="Availability">
        <Check
          label="In stock only"
          checked={search.instock}
          onChange={() => onChange({ instock: !search.instock, page: 1 })}
        />
      </Group>

      <Group title="Discount">
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 40].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onChange({ discount: search.discount === d ? 0 : d, page: 1 })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                search.discount === d
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-surface",
              )}
            >
              {d}% or more
            </button>
          ))}
        </div>
      </Group>

      {!hide.includes("vendors") && !!facets?.vendors.length && (
        <Group title="Stores">
          {facets.vendors.map((f) => (
            <Check
              key={f.value}
              label={f.label}
              count={f.count}
              checked={toList(search.vendor).includes(f.value)}
              onChange={() => onChange({ vendor: toggleInCsv(search.vendor, f.value), page: 1 })}
            />
          ))}
        </Group>
      )}
    </aside>
  );
}
