import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const list = images.length ? images : [""];
  const current = list[Math.min(index, list.length - 1)]!;

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div
        className="relative aspect-square flex-1 overflow-hidden rounded-xl border border-border bg-surface"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <img
          src={current}
          alt={alt}
          className="size-full object-cover transition-transform duration-200"
          style={{ transformOrigin: origin, transform: zoom ? "scale(1.9)" : "scale(1)" }}
        />
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur">
          <ZoomIn className="size-3.5" strokeWidth={1.8} /> Hover to zoom
        </span>
        {list.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
              className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card backdrop-blur"
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setIndex((i) => (i + 1) % list.length)}
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card backdrop-blur"
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
        {list.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            aria-label={`View image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-surface transition-colors lg:size-20",
              i === index ? "border-primary" : "border-border hover:border-primary/40",
            )}
          >
            <img src={src} alt="" loading="lazy" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
