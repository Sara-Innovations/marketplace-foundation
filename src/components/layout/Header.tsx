import { useEffect, useState } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useCartCount, useWishlistCount } from "@/store/useCart";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Deals", href: "/deals" },
  { label: "New arrivals", href: "/new" },
  { label: "Stores", href: "/stores" },
  { label: "Best sellers", href: "/best-sellers" },
  { label: "Sell on Marketplace", href: "/sell" },
];

function Counter({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold tabular-nums text-primary-foreground">
      {value > 99 ? "99+" : value}
    </span>
  );
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const cartCount = useCartCount();
  const wishCount = useWishlistCount();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="shell flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-1.5">
            <Sparkles className="size-3.5" strokeWidth={1.8} />
            Free shipping on orders over $75 from verified sellers
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5" strokeWidth={1.8} /> Track your order
            </span>
            <span>Help centre</span>
            <span>USD / EN</span>
          </div>
        </div>
      </div>

      <div className="shell flex h-16 items-center gap-3 lg:h-20 lg:gap-6">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="grid size-10 place-items-center rounded-lg border border-border lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.8} />
        </button>

        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Marketplace
          </span>
        </a>

        <div className="relative ml-auto hidden max-w-2xl flex-1 lg:block">
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.8}
          />
          <input
            id="site-search"
            type="search"
            placeholder="Search products, brands and stores"
            className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-28 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card"
          />
          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-2">
          <a
            href="/wishlist"
            aria-label="Wishlist"
            className="relative grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface"
          >
            <Heart className="size-5" strokeWidth={1.8} />
            {mounted && <Counter value={wishCount} />}
          </a>
          <a
            href="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface"
          >
            <ShoppingCart className="size-5" strokeWidth={1.8} />
            {mounted && <Counter value={cartCount} />}
          </a>
          <a
            href="/account"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface sm:flex"
          >
            <User className="size-5" strokeWidth={1.8} />
            <span className="hidden lg:inline">Account</span>
            <ChevronDown className="hidden size-4 text-muted-foreground lg:inline" strokeWidth={1.8} />
          </a>
        </div>
      </div>

      {/* Mobile search */}
      <div className="shell pb-3 lg:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.8}
          />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products and stores"
            className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-card"
          />
        </div>
      </div>

      {/* Desktop category bar */}
      <nav className="hidden border-t border-border lg:block">
        <div className="shell flex h-12 items-center gap-6 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 font-semibold"
              aria-expanded={catOpen}
            >
              <Menu className="size-4" strokeWidth={2} /> All categories
              <ChevronDown
                className={cn("size-4 transition-transform", catOpen && "rotate-180")}
                strokeWidth={2}
              />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full z-50 grid w-[640px] grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-3 shadow-lift">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-surface"
                  >
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {c.children?.join(" · ")}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-background p-5 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="grid size-9 place-items-center rounded-lg border border-border"
              >
                <X className="size-5" strokeWidth={1.8} />
              </button>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <div className="mt-2 flex flex-col">
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="border-b border-border py-3 text-sm font-medium"
                >
                  {c.name}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Explore
            </p>
            <div className="mt-2 flex flex-col">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="border-b border-border py-3 text-sm font-medium">
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="/account"
              className="mt-6 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
