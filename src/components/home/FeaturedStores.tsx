import { useQuery } from "@tanstack/react-query";
import { getFeaturedVendors } from "@/api/vendors";
import { queryKeys } from "@/api/client";
import { StoreCard } from "@/components/commerce/StoreCard";
import { SectionHeader } from "./SectionHeader";

export function FeaturedStores() {
  const { data } = useQuery({
    queryKey: queryKeys.featuredVendors,
    queryFn: () => getFeaturedVendors(4),
  });

  return (
    <section className="shell pt-14">
      <SectionHeader
        eyebrow="Sellers"
        title="Featured stores"
        description="Top-rated independent vendors shipping worldwide."
        href="/stores"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data
          ? data.map((v) => <StoreCard key={v.id} vendor={v} />)
          : Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl border border-border bg-muted"
              />
            ))}
      </div>
    </section>
  );
}
