import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [{ title: "My Orders — Marketplace" }],
  }),
  component: AccountOrders,
});

const ORDERS = [
  { id: "ORD-928172", date: "2024-03-12", total: 129.99, status: "Delivered", items: 3 },
  { id: "ORD-449102", date: "2024-03-05", total: 45.0, status: "Processing", items: 1 },
  { id: "ORD-109283", date: "2024-02-18", total: 299.5, status: "Cancelled", items: 2 },
];

function AccountOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Order History</h2>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"].map((t) => (
          <button
            key={t}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold",
              t === "All Orders"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-surface",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {ORDERS.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-xs text-muted-foreground">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${order.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{order.items} items</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "size-2.5 rounded-full",
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Processing"
                        ? "bg-warning"
                        : "bg-destructive",
                  )}
                />
                <span className="text-sm font-semibold">{order.status}</span>
              </div>

              <Link
                to="/account/orders/$id"
                params={{ id: order.id }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-surface"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
