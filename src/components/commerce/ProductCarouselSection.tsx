import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";

export function ProductCarouselSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-2xl font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
