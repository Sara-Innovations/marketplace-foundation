import type { Category } from "@/data/types";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  return (
    <a
      href={`/category/${category.slug}`}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift",
        className,
      )}
    >
      <div className="size-20 overflow-hidden rounded-full bg-surface ring-1 ring-border">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{category.name}</p>
        <p className="text-xs text-muted-foreground">{formatCompact(category.itemCount)} items</p>
      </div>
    </a>
  );
}
