import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/account/reviews")({
  head: () => ({
    meta: [{ title: "My Reviews — Marketplace" }],
  }),
  component: AccountReviews,
});

function AccountReviews() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Reviews</h2>

      <div className="space-y-4">
        {[1, 2].map((review) => (
          <div key={review} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="size-16 shrink-0 rounded-lg bg-surface" />
              <div className="flex-1">
                <Link to="/shop" className="font-semibold hover:underline">
                  Mock Product Name {review}
                </Link>
                <p className="text-xs text-muted-foreground">Reviewed on March 1, 2024</p>
                <div className="mt-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3 ${i < 4 ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">
                  This product is really great! I enjoyed using it and it exceeded my expectations.
                  Fast shipping too.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
