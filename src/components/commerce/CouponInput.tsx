import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/store/useCart";
import { toast } from "sonner";

// Mock coupon validation
export const COUPONS: Record<string, number> = {
  SAVE10: 10,
  WELCOME: 15,
  FLASH20: 20,
};

export function CouponInput() {
  const { coupon, setCoupon } = useCart();
  const [code, setCode] = useState("");

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const upper = code.trim().toUpperCase();
    if (!upper) return;

    if (COUPONS[upper]) {
      setCoupon(upper);
      toast.success(`Coupon applied! ${COUPONS[upper]}% off your order.`);
      setCode("");
    } else {
      toast.error("Invalid or expired coupon code.");
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/10 px-4 py-3">
        <div className="flex items-center gap-2 text-success">
          <Tag className="size-4" />
          <span className="text-sm font-semibold">
            {coupon} applied ({COUPONS[coupon]}% off)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setCoupon(null)}
          className="rounded-full p-1 text-success hover:bg-success/20"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={apply} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Promo code (e.g. SAVE10)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        disabled={!code.trim()}
        className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground disabled:opacity-50"
      >
        Apply
      </button>
    </form>
  );
}
