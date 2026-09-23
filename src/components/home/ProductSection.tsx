import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { getProducts, type ProductFilter } from "@/api/products";
import { queryKeys } from "@/api/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "./SectionHeader";
import { ProductSkeletonGrid } from "./ProductSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProductSection({
  filter,
  eyebrow,
  title,
  description,
  limit = 10,
  href = "#",
  variant = "grid",
}: {
  filter: ProductFilter;
  eyebrow?: string;
  title: string;
  description?: string;
  limit?: number;
  href?: string;
  variant?: "grid" | "carousel";
}) {
  const { data } = useQuery({
    queryKey: queryKeys.productList(filter),
    queryFn: () => getProducts(filter, limit),
  });

  return (
    <section className="shell pt-14">
      {variant === "carousel" ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <SectionHeader 
            eyebrow={eyebrow} 
            title={title} 
            description={description} 
            action={
              <div className="flex items-center gap-2">
                <a
                  href={href}
                  className="group mr-2 hidden sm:flex items-center gap-1.5 text-sm font-semibold text-foreground"
                >
                  View all
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
                <div className="flex items-center gap-1">
                  <CarouselPrevious className="static translate-x-0 translate-y-0 bg-surface hover:bg-muted" />
                  <CarouselNext className="static translate-x-0 translate-y-0 bg-surface hover:bg-muted" />
                </div>
              </div>
            }
          />
          <div className="relative">
            <CarouselContent className="-ml-2 md:-ml-4">
              {data ? (
                data.map((p) => (
                  <CarouselItem key={p.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <ProductCard product={p} />
                  </CarouselItem>
                ))
              ) : (
                Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <div className="h-[300px] w-full rounded-xl bg-muted animate-pulse" />
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </div>
        </Carousel>
      ) : (
        <>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} href={href} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data ? (
              data.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <ProductSkeletonGrid count={limit > 6 ? 12 : 6} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
