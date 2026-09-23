import { createFileRoute } from "@tanstack/react-router";
import { vendors } from "@/data/vendors";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { StoreCard } from "@/components/commerce/StoreCard";

const title = "Browse verified stores — Marketplace";
const description =
  "Meet the independent sellers behind the marketplace. Follow stores, read ratings and shop their full catalogue.";

export const Route = createFileRoute("/stores")({
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
  component: StoresPage,
});

function StoresPage() {
  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Stores" }]} />
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Verified stores
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {vendors.length} independent sellers, each rated by real customers.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {vendors.map((v) => (
            <StoreCard key={v.id} vendor={v} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
