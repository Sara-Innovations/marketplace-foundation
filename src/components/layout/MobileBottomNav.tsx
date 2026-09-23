import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingCart, User, Heart } from "lucide-react";
import { useCartCount } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";

export function MobileBottomNav() {
  const location = useLocation();
  const cartCount = useCartCount();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      isActive: location.pathname === "/",
    },
    {
      label: "Offers",
      icon: LayoutGrid,
      href: "/offers",
      isActive: location.pathname === "/offers",
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      href: "/cart",
      isActive: location.pathname === "/cart",
      badge: cartCount,
    },
    {
      label: "Wishlist",
      icon: Heart,
      href: "/account/wishlist",
      isActive: location.pathname === "/account/wishlist",
    },
    {
      label: "Account",
      icon: User,
      href: isAuthenticated ? "/account" : "/login",
      isActive: location.pathname.startsWith("/account") || location.pathname === "/login",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border bg-background pb-safe pt-1 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            to={item.href}
            className={`relative flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              item.isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="relative">
              <Icon className="size-5" strokeWidth={item.isActive ? 2.5 : 2} />
              {mounted && item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -right-2 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold tabular-nums text-primary-foreground border-2 border-background">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium ${item.isActive ? "font-bold" : ""}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
