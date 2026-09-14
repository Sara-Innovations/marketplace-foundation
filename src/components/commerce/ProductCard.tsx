import { Heart, ShoppingCart, BadgeCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { getVendorById } from "@/api/vendors";
import { cn } from "@/lib/utils";
import { formatPrice, formatCompact, discountPercent } from "@/lib/format";
import { useCart } from "@/store/useCart";
import { DiscountBadge } from "./DiscountBadge";
import { Rating } from "./Rating";

export function ProductCard({
  product,
  showProgress = false,
  className,
}: {
  product: Product;
  showProgress?: boolean;
  className?: string;
}) {
  const vendor = getVendorById(product.vendorId);
  const addItem = useCart((s) => s.addItem);
  const toggleWishlist = useCart((s) => s.toggleWishlist);
  const wishlisted = useCart((s) => s.wishlist.includes(product.id));
  const percent = discountPercent(product.price, product.compareAtPrice);
  const claimed = Math.min(
    98,
    Math.round((product.sold / (product.sold + product.stock)) * 100) || 0,
  );

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          <DiscountBadge percent={percent} />
          {product.tags.includes("new") && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-ink-foreground">
              New
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => {
            toggleWishlist(product.id);
            toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition-colors hover:bg-card"
        >
          <Heart className={cn("size-4", wishlisted && "fill-sale text-sale")} strokeWidth={1.8} />
        </button>

        <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              addItem(product.id);
              toast.success("Added to cart", { description: product.name });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingCart className="size-4" strokeWidth={2} />
            Add to cart
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {vendor && (
          <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {vendor.name}
            {vendor.verified && <BadgeCheck className="size-3.5 text-accent" strokeWidth={2} />}
          </span>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-1">
          <span className="text-base font-bold tabular-nums text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {product.freeShipping && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-success">
            <Truck className="size-3.5" strokeWidth={1.8} /> Free shipping
          </span>
        )}

        {showProgress && (
          <div className="space-y-1 pt-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-sale" style={{ width: `${claimed}%` }} />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {formatCompact(product.sold)} sold &middot; {product.stock} left
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
