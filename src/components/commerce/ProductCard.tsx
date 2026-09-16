import { Link } from "@tanstack/react-router";
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
  variant = "grid",
  className,
}: {
  product: Product;
  showProgress?: boolean;
  variant?: "grid" | "list";
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

  const storeLine = vendor && (
    <Link
      to="/store/$slug"
      params={{ slug: vendor.slug }}
      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
    >
      <img src={vendor.logo} alt="" loading="lazy" className="size-4 rounded-full object-cover" />
      {vendor.name}
      {vendor.verified && <BadgeCheck className="size-3.5 text-accent" strokeWidth={2} />}
    </Link>
  );

  const priceBlock = (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-base font-bold tabular-nums text-foreground">
        {formatPrice(product.price)}
      </span>
      {product.compareAtPrice && (
        <span className="text-xs text-muted-foreground line-through tabular-nums">
          {formatPrice(product.compareAtPrice)}
        </span>
      )}
    </div>
  );

  const wishButton = (
    <button
      type="button"
      aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={wishlisted}
      onClick={() => {
        toggleWishlist(product.id);
        toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
      }}
      className="grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition-colors hover:bg-card"
    >
      <Heart className={cn("size-4", wishlisted && "fill-sale text-sale")} strokeWidth={1.8} />
    </button>
  );

  const addToCart = (
    <button
      type="button"
      onClick={() => {
        addItem(product.id);
        toast.success("Added to cart", { description: product.name });
      }}
      className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <ShoppingCart className="size-4" strokeWidth={2} />
      Add to cart
    </button>
  );

  if (variant === "list") {
    return (
      <article
        className={cn(
          "flex gap-4 rounded-xl border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-lift",
          className,
        )}
      >
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="relative w-32 shrink-0 overflow-hidden rounded-lg bg-surface sm:w-44"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-square size-full object-cover"
          />
          <div className="absolute left-2 top-2">
            <DiscountBadge percent={percent} />
          </div>
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {storeLine}
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
              {product.name}
            </h3>
          </Link>
          <Rating value={product.rating} count={product.reviewCount} />
          <p className="line-clamp-2 hidden text-xs text-muted-foreground sm:block">
            {product.description}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
            <div>
              {priceBlock}
              <p className="text-[11px] text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"} &middot;{" "}
                {formatCompact(product.sold)} sold
              </p>
            </div>
            <div className="flex items-center gap-2">
              {wishButton}
              {addToCart}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          <DiscountBadge percent={percent} />
          {product.tags.includes("new") && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-ink-foreground">
              New
            </span>
          )}
        </div>
        <div className="absolute right-2.5 top-2.5">{wishButton}</div>

        <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="grid">{addToCart}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {storeLine}
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} count={product.reviewCount} />

        <div className="mt-auto pt-1">{priceBlock}</div>

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
