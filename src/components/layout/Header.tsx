import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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
  Globe,
  Settings,
  LogOut,
  Package,
  MapPin,
  HelpCircle,
  Check,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useCartCount, useWishlistCount } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { usePreferences } from "@/store/usePreferences";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Offers", href: "/offers" },
  { label: "Flash Sale", href: "/flash-sale" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Sell", href: "/sell" },
  { label: "Help Centre", href: "/help" },
];

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex items-center justify-center bg-primary px-4 py-2.5 text-center text-xs font-medium text-primary-foreground sm:text-sm">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          New
        </span>
        <p>
          Spring Collection is here. Get 20% off your first order with code{" "}
          <span className="font-bold">SPRING20</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-colors hover:bg-white/20 sm:right-4"
        aria-label="Close announcement"
      >
        <X className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold tabular-nums text-primary-foreground">
      {value > 99 ? "99+" : value}
    </span>
  );
}

function CurrencyLanguageSelector() {
  const { language, currency, setLanguage, setCurrency } = usePreferences();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Globe className="size-3.5" strokeWidth={1.8} /> {currency} / {language.toUpperCase()}{" "}
          <ChevronDown className="size-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-0">
        <div className="p-3">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Language
          </h4>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setLanguage("en");
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-surface"
            >
              English {language === "en" && <Check className="size-4 text-primary" />}
            </button>
            <button
              onClick={() => {
                setLanguage("bn");
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-surface"
            >
              বাংলা {language === "bn" && <Check className="size-4 text-primary" />}
            </button>
          </div>
          <div className="my-3 h-px bg-border" />
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Currency
          </h4>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setCurrency("USD");
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-surface"
            >
              USD ($) {currency === "USD" && <Check className="size-4 text-primary" />}
            </button>
            <button
              onClick={() => {
                setCurrency("BDT");
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-surface"
            >
              BDT (৳) {currency === "BDT" && <Check className="size-4 text-primary" />}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AccountDropdown() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface sm:flex">
          <User className="size-5" strokeWidth={1.8} />
          <span className="hidden lg:inline">Account</span>
          <ChevronDown
            className="hidden size-4 text-muted-foreground lg:inline"
            strokeWidth={1.8}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">ME</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-bold">Md. Enzamamul</p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  shiplu@example.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account" className="cursor-pointer flex items-center">
                <User className="mr-2 size-4" /> My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/orders" className="cursor-pointer flex items-center">
                <Package className="mr-2 size-4" /> My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/wishlist" className="cursor-pointer flex items-center">
                <Heart className="mr-2 size-4" /> Wishlist
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/addresses" className="cursor-pointer flex items-center">
                <MapPin className="mr-2 size-4" /> Addresses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/settings" className="cursor-pointer flex items-center">
                <Settings className="mr-2 size-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-destructive focus:text-destructive flex items-center"
            >
              <LogOut className="mr-2 size-4" /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login" className="cursor-pointer font-bold">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register" className="cursor-pointer">
                Register
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/track-order" className="cursor-pointer flex items-center">
                <Truck className="mr-2 size-4" /> Track Order
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/help" className="cursor-pointer flex items-center">
                <HelpCircle className="mr-2 size-4" /> Help Centre
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <AnnouncementBar />
      <div className="hidden bg-ink text-ink-foreground/80 md:block">
        <div className="shell flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Sparkles className="size-3.5 text-primary" strokeWidth={1.8} />
            Free shipping on orders over $75 from verified sellers
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Truck className="size-3.5" strokeWidth={1.8} /> Track your order
            </Link>
            <Link to="/help" className="hover:text-white transition-colors">
              Help centre
            </Link>
            {mounted && <CurrencyLanguageSelector />}
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

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/logo.png" alt="Bargainn Shop" className="h-10 w-auto object-contain" />
        </Link>

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
          <Link
            to="/account/wishlist"
            aria-label="Wishlist"
            className="relative grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface"
          >
            <Heart className="size-5" strokeWidth={1.8} />
            {mounted && <Counter value={wishlistCount} />}
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface"
          >
            <ShoppingCart className="size-5" strokeWidth={1.8} />
            {mounted && <Counter value={cartCount} />}
          </Link>
          {mounted && <AccountDropdown />}
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
              <Menu className="size-4" strokeWidth={2} /> Categories
              <ChevronDown
                className={cn("size-4 transition-transform", catOpen && "rotate-180")}
                strokeWidth={2}
              />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full z-50 grid w-[640px] grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-3 shadow-lift">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-surface"
                  >
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {c.children?.join(" · ")}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
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
              Explore
            </p>
            <div className="mt-2 flex flex-col">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/track-order"
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3 text-sm font-medium"
              >
                Track Order
              </Link>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <div className="mt-2 flex flex-col">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <div className="mt-6">{mounted && <CurrencyLanguageSelector />}</div>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Sign in to Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
