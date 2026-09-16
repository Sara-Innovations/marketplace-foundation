import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className,
}: {
  price: number;
  compareAtPrice?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const percent = discountPercent(price, compareAtPrice);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2.5 gap-y-1", className)}>
      <span
        className={cn(
          "font-bold tabular-nums text-foreground",
          size === "lg" ? "text-3xl" : "text-base",
        )}
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && (
        <span className="text-sm text-muted-foreground line-through tabular-nums">
          {formatPrice(compareAtPrice)}
        </span>
      )}
      {percent > 0 && (
        <span className="rounded-full bg-sale/10 px-2 py-0.5 text-xs font-bold text-sale">
          Save {percent}%
        </span>
      )}
    </div>
  );
}
