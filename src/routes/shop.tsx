import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CatalogBrowser } from "@/components/commerce/CatalogBrowser";
import type { FilterPatch } from "@/components/commerce/FilterSidebar";
import { validateCatalogSearch } from "@/lib/search-params";

const title = "Shop all products — Marketplace";
const description =
  "Browse every listing from verified marketplace sellers. Filter by category, price, brand, rating, discount and store.";

export const Route = createFileRoute("/shop")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const onChange = (patch: FilterPatch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Shop" }]} />
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Shop all products
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every listing across the marketplace, from verified independent sellers.
        </p>
      </div>
      <div className="shell pt-8">
        <CatalogBrowser search={search} onChange={onChange} scopeKey="shop" />
      </div>
    </PageShell>
  );
}
