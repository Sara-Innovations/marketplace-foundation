import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { queryCatalog, type CatalogScope } from "@/api/catalog";
import { activeFilterCount, type CatalogSearch } from "@/lib/search-params";
import { cn } from "@/lib/utils";
import { FilterSidebar, type FilterPatch } from "./FilterSidebar";
import { FilterDrawer } from "./FilterDrawer";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { SortDropdown } from "./SortDropdown";

export function CatalogBrowser({
  search,
  onChange,
  scope = {},
  hide = [],
  scopeKey,
}: {
  search: CatalogSearch;
  onChange: (patch: FilterPatch) => void;
  scope?: CatalogScope;
  hide?: ("categories" | "vendors")[];
  scopeKey: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ["catalog", scopeKey, search],
    queryFn: () => queryCatalog(search, scope),
  });

  const resetFilters = () =>
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
    });

  return (
    <div className="flex gap-8">
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-32">
          <FilterSidebar search={search} facets={data?.facets} onChange={onChange} hide={hide} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">{data?.total ?? 0}</span>{" "}
            products
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal className="size-4" strokeWidth={1.8} />
              Filters
              {activeFilterCount(search) > 0 && (
                <span className="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">
                  {activeFilterCount(search)}
                </span>
              )}
            </button>
            <SortDropdown value={search.sort} onChange={(sort) => onChange({ sort, page: 1 })} />
            <div className="hidden items-center rounded-lg border border-border p-0.5 sm:flex">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-label={`${v} view`}
                  aria-pressed={search.view === v}
                  onClick={() => onChange({ view: v })}
                  className={cn(
                    "grid size-9 place-items-center rounded-md transition-colors",
                    search.view === v ? "bg-primary text-primary-foreground" : "hover:bg-surface",
                  )}
                >
                  {v === "grid" ? (
                    <LayoutGrid className="size-4" strokeWidth={1.8} />
                  ) : (
                    <List className="size-4" strokeWidth={1.8} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ProductGrid
          products={data?.items ?? []}
          view={search.view}
          loading={isPending}
          error={isError}
          onReset={resetFilters}
        />

        <Pagination
          page={data?.page ?? 1}
          pageCount={data?.pageCount ?? 1}
          onChange={(page) => onChange({ page })}
        />
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        search={search}
        facets={data?.facets}
        onChange={onChange}
        total={data?.total ?? 0}
        hide={hide}
      />
    </div>
  );
}
