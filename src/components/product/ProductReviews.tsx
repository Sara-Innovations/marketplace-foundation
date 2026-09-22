import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { getProductReviews } from "@/api/reviews";
import { Rating } from "@/components/commerce/Rating";
import { ReviewCard } from "./ReviewCard";

export function ProductReviews({ productId }: { productId: string }) {
  const { data, isPending } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
  });

  return (
    <section id="reviews" className="mt-12">
      <h2 className="text-2xl font-bold text-foreground">Customer reviews</h2>

      <div className="mt-5 grid gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-[260px_1fr]">
        <div className="text-center sm:text-left">
          <p className="font-display text-5xl font-bold tabular-nums text-foreground">
            {(data?.average ?? 0).toFixed(1)}
          </p>
          <Rating value={data?.average ?? 0} className="mt-2 justify-center sm:justify-start" />
          <p className="mt-1 text-sm text-muted-foreground">Based on {data?.total ?? 0} reviews</p>
          <button
            type="button"
            onClick={() => toast("Review form coming soon")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Star className="size-4" strokeWidth={2} /> Write a review
          </button>
        </div>

        <div className="space-y-2">
          {(data?.breakdown ?? []).map((b) => (
            <div key={b.stars} className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="w-10 shrink-0 tabular-nums">{b.stars} star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${b.percent}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right tabular-nums">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 rounded-xl border border-border bg-card px-5 sm:px-6">
        {isPending ? (
          <div className="space-y-3 py-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          (data?.items ?? []).map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>
    </section>
  );
}
