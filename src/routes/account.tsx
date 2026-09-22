import { createFileRoute, redirect, Outlet, Link, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/store/useAuth";
import { PageShell } from "@/components/layout/PageShell";
import { Package, Heart, MapPin, Star, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  beforeLoad: () => {
    if (!useAuth.getState().isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AccountLayout,
});

const nav = [
  { label: "Dashboard", to: "/account", exact: true },
  { label: "Orders", to: "/account/orders", icon: Package },
  { label: "Wishlist", to: "/account/wishlist", icon: Heart },
  { label: "Addresses", to: "/account/addresses", icon: MapPin },
  { label: "Reviews", to: "/account/reviews", icon: Star },
  { label: "Settings", to: "/account/settings", icon: Settings },
];

function AccountLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };

  return (
    <PageShell>
      <div className="shell pt-6 pb-16">
        <h1 className="font-display text-3xl font-bold text-foreground">My Account</h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <aside className="w-full shrink-0 md:w-64">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="mt-4 flex flex-col space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  activeOptions={item.exact ? { exact: true } : undefined}
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-surface hover:text-foreground [&.active]:bg-surface [&.active]:text-foreground"
                >
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </nav>
          </aside>

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </PageShell>
  );
}
