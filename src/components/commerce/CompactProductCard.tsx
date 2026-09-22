import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/store/useCart";

export function CompactProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <article className="group flex w-[240px] shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-border bg-card p-2 shadow-sm transition-all hover:shadow-md sm:w-[280px]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-surface sm:size-20"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground sm:text-sm">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addItem({ productId: product.id, quantity: 1 });
              toast.success("Added to cart");
            }}
            className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingCart className="size-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
