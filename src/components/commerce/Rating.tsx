import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCompact } from "@/lib/format";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(value) ? "fill-primary text-primary" : "text-border",
            )}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="font-semibold text-foreground tabular-nums">{value.toFixed(1)}</span>
      {count !== undefined && <span>({formatCompact(count)})</span>}
    </div>
  );
}
