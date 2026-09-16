import { ArrowDownWideNarrow } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/lib/search-params";

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <div className="relative flex items-center gap-2">
      <ArrowDownWideNarrow className="size-4 text-muted-foreground" strokeWidth={1.8} />
      <label className="sr-only" htmlFor="sort-select">
        Sort products
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-10 rounded-lg border border-border bg-card px-3 pr-8 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
