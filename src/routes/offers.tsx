import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, Copy, Check, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { ProductCard } from "@/components/commerce/ProductCard";
import { StoreCard } from "@/components/commerce/StoreCard";
import { products } from "@/data/products";
import { vendors } from "@/data/vendors";
import { categories } from "@/data/categories";
import { COUPONS } from "@/components/commerce/CouponInput";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Deals | BargainShop" },
      {
        name: "description",
        content: "Discover the latest offers, deals, and coupons at BargainShop.",
      },
    ],
  }),
  component: OffersPage,
});

function CouponCard({ code, discount }: { code: string; discount: number }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="absolute -left-4 -top-4 grid size-12 place-items-center rounded-full bg-sale/10 text-sale">
        <Tag className="size-5" />
      </div>
      <h3 className="font-display text-2xl font-black text-foreground">{discount}% OFF</h3>
      <p className="mt-1 text-sm font-medium text-muted-foreground">Minimum order ৳1,000</p>

      <div className="mt-6 flex items-center justify-between gap-2 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-2 w-full max-w-[200px]">
        <span className="font-mono font-bold tracking-wider text-primary">{code}</span>
        <button
          onClick={handleCopy}
          className="grid size-8 place-items-center rounded bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Valid until {mounted ? new Date(Date.now() + 86400000 * 5).toLocaleDateString() : '...'}
      </p>
    </div>
  );
}

function OffersPage() {
  const discountedProducts = products
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .slice(0, 4);
  const featuredStores = vendors.slice(0, 3);
  const promoCategories = categories.slice(0, 4);

  return (
    <PageShell>
      <div className="shell py-6">
        <Breadcrumbs items={[{ label: "Offers" }]} />

        {/* Hero Section */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-24">
            <Gift className="mb-6 size-16 opacity-90" strokeWidth={1.5} />
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Offers & Deals
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium opacity-90 sm:text-xl">
              Discover amazing discounts, exclusive coupons, and the best deals from our top stores.
              Don't miss out on these limited-time savings!
            </p>
          </div>
        </div>

        {/* Coupons Section */}
        <section className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Available Coupons
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(COUPONS).map(([code, discount]) => (
              <CouponCard key={code} code={code} discount={discount} />
            ))}
          </div>
        </section>

        {/* Today's Offers (Products) */}
        <section className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Today's Offers
            </h2>
            <Link
              to="/shop"
              search={{ discount: true }}
              className="text-sm font-bold text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Store Offers */}
        <section className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Store Offers
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} vendor={store} />
            ))}
          </div>
        </section>

        {/* Category Offers */}
        <section className="mt-20 mb-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Category Deals
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promoCategories.map((category) => (
              <Link
                key={category.id}
                to="/category/$slug"
                params={{ slug: category.slug }}
                className="group relative h-48 overflow-hidden rounded-2xl bg-surface"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <h3 className="font-display text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white/80">Up to 40% Off</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
