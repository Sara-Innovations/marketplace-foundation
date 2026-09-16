import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="grid size-10 place-items-center rounded-lg border border-border transition-colors hover:bg-surface disabled:opacity-40"
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1]! > 1 && <span className="px-1 text-muted-foreground">…</span>}
          <button
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={cn(
              "size-10 rounded-lg border text-sm font-semibold tabular-nums transition-colors",
              p === page
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-surface",
            )}
          >
            {p}
          </button>
        </span>
      ))}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        className="grid size-10 place-items-center rounded-lg border border-border transition-colors hover:bg-surface disabled:opacity-40"
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  );
}
