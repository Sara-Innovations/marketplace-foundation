import { useQuery } from "@tanstack/react-query";
import { getProducts, type ProductFilter } from "@/api/products";
import { queryKeys } from "@/api/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "./SectionHeader";
import { ProductSkeletonGrid } from "./ProductSkeleton";

export function ProductSection({
  filter,
  eyebrow,
  title,
  description,
  limit = 10,
  href = "#",
}: {
  filter: ProductFilter;
  eyebrow?: string;
  title: string;
  description?: string;
  limit?: number;
  href?: string;
}) {
  const { data } = useQuery({
    queryKey: queryKeys.productList(filter),
    queryFn: () => getProducts(filter, limit),
  });

  return (
    <section className="shell pt-14">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} href={href} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data ? (
          data.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <ProductSkeletonGrid count={limit > 4 ? 8 : 4} />
        )}
      </div>
    </section>
  );
}
