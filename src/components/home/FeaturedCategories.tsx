import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories";
import { queryKeys } from "@/api/client";
import { CategoryCard } from "@/components/commerce/CategoryCard";
import { SectionHeader } from "./SectionHeader";

export function FeaturedCategories() {
  const { data } = useQuery({ queryKey: queryKeys.categories, queryFn: () => getCategories() });

  return (
    <section className="shell pt-14">
      <SectionHeader
        eyebrow="Browse"
        title="Shop by category"
        description="Everything from eight departments, all in one marketplace."
        href="/categories"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {(data ?? []).map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
        {!data &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-xl border border-border bg-muted" />
          ))}
      </div>
    </section>
  );
}
