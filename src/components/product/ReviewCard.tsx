import { BadgeCheck, ThumbsUp } from "lucide-react";
import type { Review } from "@/data/types";
import { Rating } from "@/components/commerce/Rating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-b border-border py-5 last:border-b-0">
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt=""
          loading="lazy"
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            {review.author}
            {review.verified && (
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                <BadgeCheck className="size-3" strokeWidth={2} /> Verified purchase
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(review.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <Rating value={review.rating} className="mt-3" />
      <h4 className="mt-2 text-sm font-semibold text-foreground">{review.title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>

      {review.images.length > 0 && (
        <div className="mt-3 flex gap-2">
          {review.images.map((src) => (
            <img
              key={src}
              src={src}
              alt="Customer photo"
              loading="lazy"
              className="size-20 rounded-lg border border-border object-cover"
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ThumbsUp className="size-3.5" strokeWidth={1.8} /> Helpful ({review.helpful})
      </button>
    </article>
  );
}
