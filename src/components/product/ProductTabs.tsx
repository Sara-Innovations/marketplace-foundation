import { useState } from "react";
import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

const TABS = ["Description", "Specifications", "Shipping", "Returns"] as const;
type Tab = (typeof TABS)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Description");

  return (
    <section className="mt-12 rounded-xl border border-border bg-card">
      <div className="flex overflow-x-auto border-b border-border no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 border-b-2 px-5 py-3.5 text-sm font-semibold transition-colors",
              tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
        {tab === "Description" && (
          <div className="space-y-4">
            <p>{product.description}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "Specifications" && (
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between border-b border-border py-2.5">
                <dt className="font-medium text-foreground">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "Shipping" && (
          <div className="space-y-3">
            <p>
              {product.freeShipping
                ? "Free standard shipping on this item, dispatched within 1 business day."
                : "Flat-rate shipping from $6.95, dispatched within 1–2 business days."}
            </p>
            <p>Standard delivery: 3–6 business days. Express delivery: 1–2 business days.</p>
            <p>Tracking is emailed as soon as the seller hands the parcel to the carrier.</p>
          </div>
        )}

        {tab === "Returns" && (
          <div className="space-y-3">
            <p>30-day free returns on unused items in original packaging.</p>
            <p>
              Start a return from your order history — the seller provides a prepaid label for
              faulty or incorrectly described items.
            </p>
            <p>Refunds are issued to the original payment method within 5 business days.</p>
          </div>
        )}
      </div>
    </section>
  );
}
