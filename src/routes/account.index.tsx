import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, Star, Clock } from "lucide-react";
import { useAuth } from "@/store/useAuth";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [{ title: "My Dashboard — Marketplace" }],
  }),
  component: AccountDashboard,
});

function AccountDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold">Hello, {user?.name}!</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to your dashboard. From here you can manage your recent orders, shipping
          addresses, and wishlist.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Total Orders</span>
            <Package className="size-4 text-primary" />
          </div>
          <span className="text-3xl font-bold">12</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Pending</span>
            <Clock className="size-4 text-warning" />
          </div>
          <span className="text-3xl font-bold">1</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Wishlist</span>
            <Heart className="size-4 text-sale" />
          </div>
          <span className="text-3xl font-bold">8</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Reviews</span>
            <Star className="size-4 text-accent" />
          </div>
          <span className="text-3xl font-bold">4</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center py-10 text-center">
          <Package className="size-10 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 text-sm font-semibold">No recent orders found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            When you place an order, it will appear here.
          </p>
          <Link
            to="/shop"
            className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground hover:opacity-90"
          >
            Start shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
