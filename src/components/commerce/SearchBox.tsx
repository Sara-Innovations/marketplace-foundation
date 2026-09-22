import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Clock, Search, TrendingUp, X } from "lucide-react";
import { getSuggestions, POPULAR_SEARCHES } from "@/api/catalog";
import { formatPrice } from "@/lib/format";
import { addRecentSearch, clearRecentSearches, getRecentSearches } from "@/lib/recent-searches";
import { cn } from "@/lib/utils";

export function SearchBox({
  className,
  placeholder = "Search products, brands and stores",
  initialValue = "",
  compact = false,
}: {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const [term, setTerm] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setRecent(getRecentSearches()), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["suggestions", term],
    queryFn: () => getSuggestions(term),
    enabled: open && term.trim().length > 0,
  });

  const submit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    addRecentSearch(q);
    setRecent(getRecentSearches());
    setTerm(q);
    setOpen(false);
    void navigate({ to: "/search", search: { q } });
  };

  const hasResults =
    !!data && (data.products.length > 0 || data.categories.length > 0 || data.vendors.length > 0);

  return (
    <div ref={boxRef} className={cn("relative", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(term);
        }}
      >
        <label className="sr-only" htmlFor={compact ? "mobile-search" : "site-search"}>
          Search products
        </label>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.8}
        />
        <input
          id={compact ? "mobile-search" : "site-search"}
          type="search"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-full border border-border bg-surface pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card",
            compact ? "pr-4" : "pr-28",
          )}
        />
        {!compact && (
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        )}
      </form>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-popover p-3 shadow-lift">
          {!term.trim() ? (
            <div className="space-y-4">
              {recent.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-1 pb-1.5">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Recent searches
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        clearRecentSearches();
                        setRecent([]);
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" strokeWidth={2} /> Clear
                    </button>
                  </div>
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => submit(r)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface"
                    >
                      <Clock className="size-4 text-muted-foreground" strokeWidth={1.8} />
                      {r}
                    </button>
                  ))}
                </div>
              )}
              <div>
                <p className="px-1 pb-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2 px-1">
                  {POPULAR_SEARCHES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => submit(p)}
                      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface"
                    >
                      <TrendingUp className="size-3" strokeWidth={2} /> {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : isFetching && !data ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">Searching…</p>
          ) : hasResults ? (
            <div className="space-y-3">
              {data.categories.length > 0 && (
                <div>
                  <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Categories
                  </p>
                  {data.categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-2 text-sm hover:bg-surface"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
              {data.products.length > 0 && (
                <div>
                  <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Products
                  </p>
                  {data.products.map((p) => (
                    <Link
                      key={p.id}
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface"
                    >
                      <img src={p.image} alt="" className="size-10 rounded-md object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                      <span className="text-sm font-bold tabular-nums">{formatPrice(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
              {data.vendors.length > 0 && (
                <div>
                  <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Stores
                  </p>
                  {data.vendors.map((v) => (
                    <Link
                      key={v.slug}
                      to="/store/$slug"
                      params={{ slug: v.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-surface"
                    >
                      <img src={v.logo} alt="" className="size-8 rounded-full object-cover" />
                      {v.name}
                      {v.verified && <BadgeCheck className="size-4 text-accent" strokeWidth={2} />}
                    </Link>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => submit(term)}
                className="w-full rounded-lg bg-surface py-2.5 text-sm font-semibold hover:bg-muted"
              >
                See all results for “{term}”
              </button>
            </div>
          ) : (
            <p className="px-2 py-3 text-sm text-muted-foreground">
              No suggestions for “{term}”. Press enter to search anyway.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
