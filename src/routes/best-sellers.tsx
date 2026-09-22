import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { ProductCard } from "@/components/commerce/ProductCard";
import { products } from "@/data/products";
import { Trophy } from "lucide-react";
import { useState } from "react";
import { SortDropdown } from "@/components/commerce/SortDropdown";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers | BargainShop" },
      { name: "description", content: "Shop our most popular and highest rated products." },
    ],
  }),
  component: BestSellersPage,
});

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Biggest Discount", value: "discount" },
  { label: "Newest", value: "newest" },
];

function BestSellersPage() {
  const [sort, setSort] = useState("popular");

  // Create mock sales data dynamically based on ID to remain deterministic
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "popular") {
      const salesA = ((parseInt(a.id) * 123) % 5000) + 100;
      const salesB = ((parseInt(b.id) * 123) % 5000) + 100;
      return salesB - salesA;
    }
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "discount") {
      const discountA = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0;
      const discountB = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0;
      return discountB - discountA;
    }
    return 0; // Newest logic fallback
  });

  return (
    <PageShell>
      <div className="shell py-6 pb-20">
        <Breadcrumbs items={[{ label: "Best Sellers" }]} />

        {/* Hero Section */}
        <div className="mt-4 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-12 text-center text-white sm:py-16 md:py-20">
          <div className="grid size-16 place-items-center rounded-full bg-white/20">
            <Trophy className="size-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
            Best Sellers
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium opacity-90 sm:text-xl">
            Our most popular products based on sales. Updated hourly.
          </p>
        </div>

        {/* Product Grid */}
        <section className="mt-16 mb-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Top Products
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                Sort by:
              </span>
              <SortDropdown value={sort} onChange={setSort} options={SORT_OPTIONS} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product, index) => {
              const mockSales = ((parseInt(product.id) * 123) % 5000) + 100;
              return (
                <div key={product.id} className="relative group">
                  {/* Rank Badge */}
                  {index < 3 && sort === "popular" && (
                    <div className="absolute -left-2 -top-2 z-10 grid size-8 place-items-center rounded-full bg-amber-500 font-bold text-white shadow-sm ring-4 ring-background">
                      #{index + 1}
                    </div>
                  )}
                  <ProductCard product={product} />
                  {/* Sales Indicator */}
                  <div className="mt-2 text-xs font-semibold text-muted-foreground flex items-center justify-center bg-surface py-1 rounded-md">
                    {mockSales.toLocaleString()} sold recently
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
