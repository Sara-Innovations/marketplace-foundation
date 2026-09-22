import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { flashSales } from "@/data/flashSales";
import { products } from "@/data/products";

export const Route = createFileRoute("/flash-sale")({
  head: () => ({
    meta: [
      { title: "Flash Sale | BargainShop" },
      { name: "description", content: "Hurry! Limited time flash deals with massive discounts." },
    ],
  }),
  component: FlashSalePage,
});
function FlashSalePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeSale = flashSales[0];
  const saleProducts = activeSale.productIds
    .map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return null;
      // Mock flash price (20% off) and stock info based on ID
      const flashPrice = Math.floor(product.price * 0.8);
      const totalStock = (parseInt(product.id) % 50) + 10;
      const soldCount = Math.floor(totalStock * 0.7); // 70% sold
      return { product, flashPrice, soldCount, totalStock };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <PageShell>
      <div className="shell py-6">
        <Breadcrumbs items={[{ label: "Flash Sale" }]} />

        {/* Hero Section */}
        <div className="mt-4 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-sale px-6 py-12 text-center text-sale-foreground sm:py-16 md:py-20">
          <div className="grid size-16 place-items-center rounded-full bg-white/20">
            <Zap className="size-8" strokeWidth={2} />
          </div>
          <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
            Flash Sale
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium opacity-90 sm:text-xl">
            Grab these limited-time deals before they're gone! Massive discounts on top brands.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-sale-foreground/80">
              Sale Ends In
            </p>
            {/* The existing CountdownTimer is highly reusable */}
            {mounted && <CountdownTimer endsAt={activeSale.endsAt} />}
          </div>
        </div>

        {/* Product Grid with Stock Indicator */}
        <section className="mt-16 mb-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Live Deals
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {saleProducts.map(({ product, flashPrice, soldCount, totalStock }) => {
              const stockLeft = totalStock - soldCount;
              const progress = (soldCount / totalStock) * 100;

              // We create a modified product object to pass the flashPrice to the standard ProductCard
              const displayProduct = {
                ...product,
                price: flashPrice,
                compareAtPrice: product.price,
              };

              return (
                <div key={product.id} className="flex flex-col gap-2">
                  <ProductCard product={displayProduct} />

                  {/* Stock Progress Indicator */}
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="mb-1.5 flex justify-between text-xs font-semibold">
                      <span className="text-sale">
                        {progress >= 90 ? "Almost Sold Out!" : "Selling Fast"}
                      </span>
                      <span className="text-muted-foreground">Only {stockLeft} left</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-sale transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
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
