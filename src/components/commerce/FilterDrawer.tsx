import { X } from "lucide-react";
import type { CatalogResult } from "@/api/catalog";
import type { CatalogSearch } from "@/lib/search-params";
import { FilterSidebar, type FilterPatch } from "./FilterSidebar";

export function FilterDrawer({
  open,
  onClose,
  search,
  facets,
  onChange,
  total,
  hide = [],
}: {
  open: boolean;
  onClose: () => void;
  search: CatalogSearch;
  facets: CatalogResult["facets"] | undefined;
  onChange: (patch: FilterPatch) => void;
  total: number;
  hide?: ("categories" | "vendors")[];
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-background shadow-lift">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-base font-bold">Filters</span>
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg border border-border"
          >
            <X className="size-5" strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <FilterSidebar search={search} facets={facets} onChange={onChange} hide={hide} />
        </div>
        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Show {total} results
          </button>
        </div>
      </div>
    </div>
  );
}
