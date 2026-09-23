import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { products } from "@/data/products";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/deals")({
  component: DealsPage,
});

function DealsPage() {
  const deals = products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="shell py-8 md:py-12">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Today's Deals
            </h1>
            <p className="mt-2 text-muted-foreground">
              Grab the best discounts on your favorite products before they're gone!
            </p>
          </div>

          {deals.length > 0 ? (
            <ProductGrid products={deals} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No deals available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
