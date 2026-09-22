import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CatalogBrowser } from "@/components/commerce/CatalogBrowser";
import type { FilterPatch } from "@/components/commerce/FilterSidebar";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toList, toggleInCsv, validateCatalogSearch } from "@/lib/search-params";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: validateCatalogSearch,
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} — Marketplace`;
    const description = `Shop ${loaderData.category.name.toLowerCase()} from verified independent sellers. Filter by price, brand, rating and store.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <PageShell>
      <div className="shell py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Category not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-primary">
          Browse all products
        </Link>
      </div>
    </PageShell>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const onChange = (patch: FilterPatch) => navigate({ search: (prev) => ({ ...prev, ...patch }) });
  const activeSubs = toList(search.sub);

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: category.name }]} />

        <section className="relative mt-4 overflow-hidden rounded-2xl border border-border">
          <img src={category.image} alt="" className="h-44 w-full object-cover sm:h-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/20" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-6 sm:p-10">
            <h1 className="font-display text-3xl font-bold text-ink-foreground sm:text-4xl">
              {category.name}
            </h1>
            <p className="max-w-xl text-sm text-ink-foreground/80">
              {category.description ??
                `Hand-picked ${category.name.toLowerCase()} from independent sellers, with free returns on every order.`}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-foreground/70">
              {formatCompact(category.itemCount)} items
            </p>
          </div>
        </section>

        {!!category.children?.length && (
          <div className="mt-5 flex flex-wrap gap-2">
            {category.children.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onChange({ sub: toggleInCsv(search.sub, sub), page: 1 })}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  activeSubs.includes(sub)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="shell pt-8">
        <CatalogBrowser
          search={search}
          onChange={onChange}
          scope={{ categoryId: category.id }}
          hide={["categories"]}
          scopeKey={`category-${category.id}`}
        />
      </div>
    </PageShell>
  );
}
