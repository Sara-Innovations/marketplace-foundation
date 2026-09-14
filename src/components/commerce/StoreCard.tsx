import { BadgeCheck, MapPin, Store } from "lucide-react";
import type { Vendor } from "@/data/types";
import { formatCompact } from "@/lib/format";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";

export function StoreCard({ vendor, className }: { vendor: Vendor; className?: string }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative h-24 overflow-hidden bg-surface">
        <img
          src={vendor.cover}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-4 pb-4">
        <div className="-mt-8 mb-3 size-16 overflow-hidden rounded-xl border-4 border-card bg-surface">
          <img src={vendor.logo} alt={vendor.name} loading="lazy" className="size-full object-cover" />
        </div>
        <div className="flex items-center gap-1">
          <h3 className="text-sm font-semibold text-foreground">{vendor.name}</h3>
          {vendor.verified && <BadgeCheck className="size-4 text-accent" strokeWidth={2} />}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{vendor.tagline}</p>
        <Rating value={vendor.rating} count={vendor.reviewCount} className="mt-2" />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" strokeWidth={1.8} /> {vendor.location}
          </span>
          <span className="flex items-center gap-1">
            <Store className="size-3.5" strokeWidth={1.8} /> {vendor.productCount}
          </span>
        </div>
        <a
          href={`/store/${vendor.slug}`}
          className="mt-4 block rounded-lg border border-border py-2 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Visit store &middot; {formatCompact(vendor.followers)} followers
        </a>
      </div>
    </article>
  );
}
