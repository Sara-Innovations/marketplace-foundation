import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CatalogBrowser } from "@/components/commerce/CatalogBrowser";
import { SearchBox } from "@/components/commerce/SearchBox";
import type { FilterPatch } from "@/components/commerce/FilterSidebar";
import { POPULAR_SEARCHES } from "@/api/catalog";
import { validateCatalogSearch } from "@/lib/search-params";

const title = "Search the marketplace";
const description =
  "Search thousands of products, brands and independent stores. Filter and sort results instantly.";

export const Route = createFileRoute("/search")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const onChange = (patch: FilterPatch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Search" }]} />
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          {search.q ? `Results for “${search.q}”` : "Search the marketplace"}
        </h1>
        <div className="mt-4 max-w-xl">
          <SearchBox initialValue={search.q} placeholder="Search products, brands and stores" />
        </div>
        {!search.q && (
          <div className="mt-4 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onChange({ q: p, page: 1 })}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold hover:bg-surface"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="shell pt-8">
        <CatalogBrowser search={search} onChange={onChange} scopeKey="search" />
      </div>
    </PageShell>
  );
}
