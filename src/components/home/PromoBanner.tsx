import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="shell pt-14">
      <div className="grid overflow-hidden rounded-2xl border border-border shadow-card md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 bg-ink p-8 text-ink-foreground sm:p-12">
          <span className="w-fit rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
            Sell with us
          </span>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            Open your store and reach 2.4M shoppers
          </h2>
          <p className="max-w-md text-sm text-ink-foreground/75">
            Zero listing fees for the first 90 days, built-in analytics and payouts every Friday.
          </p>
          <a
            href="/sell"
            className="group flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start selling
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </a>
        </div>
        <div className="relative min-h-56">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
            alt="Independent seller packing marketplace orders"
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
