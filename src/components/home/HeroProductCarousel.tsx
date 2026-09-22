import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { CompactProductCard } from "@/components/commerce/CompactProductCard";

export function HeroProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Pick some top products to feature below the banner
  const featured = products.slice(0, 10);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
      <div className="relative group rounded-2xl">
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-md transition-all hover:bg-surface opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar"
        >
          {featured.map((p) => (
            <div key={p.id} className="snap-start">
              <CompactProductCard product={p} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-md transition-all hover:bg-surface opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
