import { BadgeCheck, CalendarDays, MapPin, Package, Users } from "lucide-react";
import type { Vendor } from "@/data/types";
import { formatCompact } from "@/lib/format";
import { Rating } from "./Rating";

export function StoreHeader({ vendor, productCount }: { vendor: Vendor; productCount: number }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="relative h-40 bg-surface sm:h-56">
        <img src={vendor.cover} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:p-6">
        <div className="-mt-16 size-24 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-surface sm:-mt-20 sm:size-28">
          <img src={vendor.logo} alt={vendor.name} className="size-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {vendor.name}
            {vendor.verified && <BadgeCheck className="size-6 text-accent" strokeWidth={2} />}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{vendor.tagline}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Rating value={vendor.rating} count={vendor.reviewCount} />
            <span className="flex items-center gap-1.5">
              <Package className="size-3.5" strokeWidth={1.8} /> {productCount} products listed
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" strokeWidth={1.8} /> {formatCompact(vendor.followers)}{" "}
              followers
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" strokeWidth={1.8} /> {vendor.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" strokeWidth={1.8} /> Selling since{" "}
              {vendor.since ?? 2019}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Follow store
        </button>
      </div>
    </section>
  );
}
