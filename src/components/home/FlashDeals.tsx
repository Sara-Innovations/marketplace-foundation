import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import { getActiveFlashSale } from "@/api/flashSales";
import { queryKeys } from "@/api/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CountdownTimer } from "./CountdownTimer";
import { ProductSkeletonGrid } from "./ProductSkeleton";

export function FlashDeals() {
  const { data } = useQuery({ queryKey: queryKeys.flashSale, queryFn: getActiveFlashSale });

  return (
    <section className="shell pt-14">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-sale text-sale-foreground">
              <Zap className="size-5 fill-current" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {data?.sale.title ?? "Flash Deals"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {data?.sale.subtitle ?? "Limited-time markdowns from verified sellers."}
              </p>
            </div>
          </div>
          {data && <CountdownTimer endsAt={data.sale.endsAt} />}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data ? (
            data.products
              .slice(0, 5)
              .map((p) => <ProductCard key={p.id} product={p} showProgress />)
          ) : (
            <ProductSkeletonGrid />
          )}
        </div>
      </div>
    </section>
  );
}
