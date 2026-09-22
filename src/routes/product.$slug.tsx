import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BadgeCheck,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { findProductBySlug, getProductRelations } from "@/api/products";
import { getVendorById } from "@/api/vendors";
import { categories } from "@/data/categories";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { Price } from "@/components/commerce/Price";
import { Rating } from "@/components/commerce/Rating";
import { ProductCarouselSection } from "@/components/commerce/ProductCarouselSection";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { FrequentlyBought } from "@/components/product/FrequentlyBought";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug);
    if (!product) throw notFound();
    const vendor = getVendorById(product.vendorId);
    const category = categories.find((c) => c.id === product.categoryId);
    return { product, vendor, category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Marketplace`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <PageShell>
      <div className="shell py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-primary">
          Browse all products
        </Link>
      </div>
    </PageShell>
  );
}

function ProductPage() {
  const { product, vendor, category } = Route.useLoaderData();
  const addItem = useCart((s) => s.addItem);
  const toggleWishlist = useCart((s) => s.toggleWishlist);
  const wishlisted = useCart((s) => s.wishlist.includes(product.id));
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");

  const { data: relations } = useQuery({
    queryKey: ["relations", product.id],
    queryFn: () => getProductRelations(product),
  });

  const inStock = product.stock > 0;

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop" },
            ...(category
              ? [{ label: category.name, to: "/category/$slug", params: { slug: category.slug } }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

          <div>
            {vendor && (
              <Link
                to="/store/$slug"
                params={{ slug: vendor.slug }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary"
              >
                <img src={vendor.logo} alt="" className="size-5 rounded-full object-cover" />
                {vendor.name}
                {vendor.verified && <BadgeCheck className="size-4 text-accent" strokeWidth={2} />}
                <span className="text-muted-foreground">· {vendor.rating.toFixed(1)} ★</span>
              </Link>
            )}

            <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <Rating value={product.rating} count={product.reviewCount} />
              <a href="#reviews" className="font-semibold text-primary hover:underline">
                {product.reviewCount} reviews
              </a>
              <span>SKU: {product.sku}</span>
              <span>{formatCompact(product.sold)} sold</span>
            </div>

            <div className="mt-5">
              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
              <p
                className={cn(
                  "mt-2 text-sm font-semibold",
                  inStock ? "text-success" : "text-destructive",
                )}
              >
                {inStock ? `In stock — ${product.stock} available` : "Currently out of stock"}
              </p>
            </div>

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Colour: <span className="text-foreground">{color}</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={cn(
                        "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                        color === c ? "border-primary bg-surface" : "border-border hover:bg-surface",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Size: <span className="text-foreground">{size}</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={cn(
                        "min-w-12 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                        size === s ? "border-primary bg-surface" : "border-border hover:bg-surface",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-11 place-items-center"
                >
                  <Minus className="size-4" strokeWidth={2} />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="grid size-11 place-items-center"
                >
                  <Plus className="size-4" strokeWidth={2} />
                </button>
              </div>

              <button
                type="button"
                disabled={!inStock}
                onClick={() => {
                  addItem(product.id, qty);
                  toast.success("Added to cart", { description: `${product.name} × ${qty}` });
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <ShoppingCart className="size-4" strokeWidth={2} /> Add to cart
              </button>

              <button
                type="button"
                disabled={!inStock}
                onClick={() => {
                  addItem(product.id, qty);
                  toast.success("Checkout opens in the next phase");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Buy now
              </button>

              <button
                type="button"
                aria-label="Save to wishlist"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
                }}
                className="grid size-11 place-items-center rounded-lg border border-border transition-colors hover:bg-surface"
              >
                <Heart
                  className={cn("size-4", wishlisted && "fill-sale text-sale")}
                  strokeWidth={1.8}
                />
              </button>

              <button
                type="button"
                aria-label="Share product"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    void navigator.clipboard?.writeText(window.location.href);
                  }
                  toast("Link copied to clipboard");
                }}
                className="grid size-11 place-items-center rounded-lg border border-border transition-colors hover:bg-surface"
              >
                <Share2 className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <ul className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 text-sm sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-primary" strokeWidth={1.8} />
                {product.freeShipping ? "Free shipping" : "From $6.95 shipping"}
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="size-4 text-primary" strokeWidth={1.8} /> 30-day returns
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" strokeWidth={1.8} /> Buyer protection
              </li>
            </ul>
          </div>
        </div>

        <ProductTabs product={product} />
        <ProductReviews productId={product.id} />
        <FrequentlyBought items={relations?.bundle ?? []} />
        <ProductCarouselSection title="Related products" products={relations?.related ?? []} />
        <ProductCarouselSection title="You may also like" products={relations?.similar ?? []} />
      </div>
    </PageShell>
  );
}
