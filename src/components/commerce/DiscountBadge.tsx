import { cn } from "@/lib/utils";

type Props = {
  percent: number;
  className?: string;
  variant?: "solid" | "soft";
};

export function DiscountBadge({ percent, className, variant = "solid" }: Props) {
  if (percent <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide tabular-nums",
        variant === "solid"
          ? "bg-sale text-sale-foreground"
          : "bg-sale/10 text-sale ring-1 ring-sale/20",
        className,
      )}
    >
      -{percent}%
    </span>
  );
}
