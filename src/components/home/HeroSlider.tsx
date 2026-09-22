import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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



export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="relative w-full">
      <div className="relative h-[480px] sm:h-[600px] lg:h-[700px] w-full">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 max-w-4xl gap-4">
              <span className="w-fit rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">
                {s.eyebrow}
              </span>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {s.title}
              </h1>
              <p className="max-w-md text-base text-white/90 sm:text-lg">{s.copy}</p>
              <a
                href="/deals"
                className="group mt-4 flex w-fit items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40 sm:left-6"
        >
          <ChevronLeft className="size-6" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40 sm:right-6"
        >
          <ChevronRight className="size-6" strokeWidth={2} />
        </button>
        <div className="absolute bottom-24 left-6 flex gap-2 sm:left-12 lg:left-24 xl:left-32">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-primary" : "w-3 bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
