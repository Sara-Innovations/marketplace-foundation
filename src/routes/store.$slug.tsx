import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { vendors } from "@/data/vendors";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { StoreHeader } from "@/components/commerce/StoreHeader";
import { CatalogBrowser } from "@/components/commerce/CatalogBrowser";
import type { FilterPatch } from "@/components/commerce/FilterSidebar";
import { cn } from "@/lib/utils";
import { toList, toggleInCsv, validateCatalogSearch } from "@/lib/search-params";

export const Route = createFileRoute("/store/$slug")({
  validateSearch: validateCatalogSearch,
  loader: ({ params }) => {
    const vendor = vendors.find((v) => v.slug === params.slug);
    if (!vendor) throw notFound();
    const storeProducts = products.filter((p) => p.vendorId === vendor.id);
    const storeCategories = [...new Set(storeProducts.map((p) => p.categoryId))].map((id) => ({
      id,
      name: categories.find((c) => c.id === id)?.name ?? id,
    }));
    return { vendor, count: storeProducts.length, storeCategories };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Store not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.vendor.name} — Marketplace store`;
    const description = loaderData.vendor.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: loaderData.vendor.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.vendor.cover },
      ],
    };
  },
  notFoundComponent: StoreNotFound,
  component: StorePage,
});

function StoreNotFound() {
  return (
    <PageShell>
      <div className="shell py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Store not found</h1>
        <Link to="/stores" className="mt-4 inline-block text-sm font-semibold text-primary">
          Browse all stores
        </Link>
      </div>
    </PageShell>
  );
}

function StorePage() {
  const { vendor, count, storeCategories } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const onChange = (patch: FilterPatch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });
  const activeCats = toList(search.cat);

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Stores", to: "/stores" }, { label: vendor.name }]} />
        <div className="mt-4">
          <StoreHeader vendor={vendor} productCount={count} />
        </div>

        <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-foreground">About the store</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {vendor.about ??
                `${vendor.name} is a verified seller based in ${vendor.location}. ${vendor.tagline} Every order is packed by the store team, ships within one business day and is covered by the marketplace 30-day return promise.`}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-foreground">Store categories</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {storeCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChange({ cat: toggleInCsv(search.cat, c.id), page: 1 })}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    activeCats.includes(c.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-surface",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="shell pt-8">
        <h2 className="mb-5 text-2xl font-bold text-foreground">Products from this store</h2>
        <CatalogBrowser
          search={search}
          onChange={onChange}
          scope={{ vendorId: vendor.id }}
          hide={["vendors"]}
          scopeKey={`store-${vendor.id}`}
        />
      </div>
    </PageShell>
  );
}
