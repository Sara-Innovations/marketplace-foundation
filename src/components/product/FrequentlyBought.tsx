import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/store/useCart";

export function FrequentlyBought({ items }: { items: Product[] }) {
  const addItem = useCart((s) => s.addItem);
  if (items.length < 2) return null;
  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <section className="mt-12 rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-xl font-bold text-foreground">Frequently bought together</h2>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-3">
          {items.map((p, i) => (
            <span key={p.id} className="flex items-center gap-3">
              {i > 0 && <Plus className="size-4 text-muted-foreground" strokeWidth={2} />}
              <span className="w-28">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-square w-28 rounded-lg border border-border object-cover"
                />
                <span className="mt-1.5 block line-clamp-2 text-xs text-muted-foreground">
                  {p.name}
                </span>
                <span className="text-xs font-bold tabular-nums">{formatPrice(p.price)}</span>
              </span>
            </span>
          ))}
        </div>
        <div className="lg:ml-auto">
          <p className="text-sm text-muted-foreground">
            Total price:{" "}
            <span className="text-lg font-bold tabular-nums text-foreground">
              {formatPrice(total)}
            </span>
          </p>
          <button
            type="button"
            onClick={() => {
              items.forEach((item) => addItem({ productId: item.id, quantity: 1 }));
              toast.success("Added bundle to cart", {
                description: `${items.length} items added successfully`,
              });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Add all to cart
          </button>
        </div>
      </div>
    </section>
  );
}
