import { PackageSearch } from "lucide-react";
import type { Product } from "@/data/types";
import { ProductSkeletonGrid } from "@/components/home/ProductSkeleton";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  view = "grid",
  loading = false,
  error = false,
  onReset,
  columns = 5,
}: {
  products: Product[];
  view?: "grid" | "list";
  loading?: boolean;
  error?: boolean;
  onReset?: () => void;
  columns?: 4 | 5;
}) {
  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <p className="font-display text-lg font-bold">Something went wrong</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We couldn&apos;t load these products. Please try again.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <ProductSkeletonGrid count={10} />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <PackageSearch className="mx-auto size-8 text-muted-foreground" strokeWidth={1.5} />
        <p className="mt-3 font-display text-lg font-bold">No products found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try removing a filter or broadening your price range.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
