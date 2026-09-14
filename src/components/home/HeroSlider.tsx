import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "s1",
    eyebrow: "Season drop",
    title: "Premium audio, marketplace prices",
    copy: "Up to 45% off studio headphones and speakers from verified sellers.",
    cta: "Shop electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "s2",
    eyebrow: "Independent makers",
    title: "Quiet luxury from 12,000 sellers",
    copy: "Curated wardrobe staples shipped directly from small studios.",
    cta: "Explore fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "s3",
    eyebrow: "Home refresh",
    title: "Furnish the whole room for less",
    copy: "Free delivery on home orders over $75, returns within 30 days.",
    cta: "Shop home & living",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
  },
];

const perks = [
  { icon: Truck, title: "Free shipping", copy: "On orders over $75" },
  { icon: Undo2, title: "30-day returns", copy: "No questions asked" },
  { icon: ShieldCheck, title: "Buyer protection", copy: "Every verified seller" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="shell pt-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-ink shadow-card">
          <div className="relative h-[320px] sm:h-[380px] lg:h-[440px]">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <img
                  src={s.image}
                  alt=""
                  className="size-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/10" />
                <div className="absolute inset-0 flex max-w-xl flex-col justify-center gap-4 p-8 sm:p-12">
                  <span className="w-fit rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                    {s.eyebrow}
                  </span>
                  <h1 className="text-3xl font-bold leading-tight text-ink-foreground sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h1>
                  <p className="max-w-md text-sm text-ink-foreground/80 sm:text-base">{s.copy}</p>
                  <a
                    href="/deals"
                    className="group mt-2 flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {s.cta}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
          <div className="absolute bottom-5 left-8 flex gap-2 sm:left-12">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-primary" : "w-3 bg-ink-foreground/40",
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <a
            href="/deals"
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift sm:col-span-2 lg:col-span-1"
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-sale">
              Today only
            </span>
            <p className="mt-2 text-lg font-bold leading-snug">Extra 15% off flash deals</p>
            <p className="mt-1 text-sm text-muted-foreground">Code FLASH15 at checkout</p>
          </a>
          {perks.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-primary">
                <p.icon className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
