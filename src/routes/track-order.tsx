import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Package, CheckCircle2, Truck, Box } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { trackOrder, OrderTrackResult, OrderStatus } from "@/api/orders";
import { Price } from "@/components/commerce/Price";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order | BargainShop" },
      { name: "description", content: "Track your BargainShop order status." },
    ],
  }),
  component: TrackOrderPage,
});

const TIMELINE_STEPS = [
  { id: "placed", label: "Order Placed", icon: Package },
  { id: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { id: "processing", label: "Processing", icon: Box },
  { id: "shipped", label: "Shipped", icon: Truck },
  { id: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
];

function OrderTrackingTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = TIMELINE_STEPS.findIndex((s) => s.id === status);

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border sm:left-auto sm:top-4 sm:bottom-auto sm:h-0.5 sm:w-full" />
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-0">
          {TIMELINE_STEPS.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={step.id}
                className="relative flex items-center gap-4 sm:flex-col sm:gap-3 z-10"
              >
                <div
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 bg-background transition-colors",
                    isCompleted
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                    isCurrent &&
                      "bg-primary text-primary-foreground border-primary shadow-[0_0_0_4px_rgba(var(--primary),0.2)]",
                  )}
                >
                  <step.icon className="size-4" strokeWidth={isCurrent ? 2.5 : 2} />
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderTrackResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const data = await trackOrder(orderId);
      setResult(data);
    } catch (error) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="shell py-6 pb-20">
        <Breadcrumbs items={[{ label: "Track Order" }]} />

        <div className="mx-auto max-w-3xl mt-4">
          <div className="rounded-3xl bg-surface px-6 py-12 sm:px-12 md:py-16 text-center">
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground">
              Track Your Order
            </h1>
            <p className="mt-4 text-muted-foreground">
              Enter your order number below to check its current status. (Try: BS-2026-001245)
            </p>

            <form
              onSubmit={handleTrack}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-center"
            >
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order Number (e.g. BS-2026-001245)"
                  className="w-full rounded-xl border border-input bg-background px-12 py-3.5 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>
          </div>

          {searched && !loading && (
            <div className="mt-8">
              {result ? (
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Order #{result.id}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(result.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Total Amount
                      </p>
                      <div className="mt-1 text-xl font-bold">
                        <Price price={result.total} />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 mt-6">
                    <div className="rounded-xl bg-surface p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Delivery Information
                      </h3>
                      <p className="mt-2 font-medium">{result.deliveryAddress}</p>
                      <p className="mt-2 text-sm">
                        Courier: <span className="font-bold">{result.courier}</span>
                      </p>
                      <p className="text-sm">
                        Tracking No: <span className="font-bold">{result.trackingNumber}</span>
                      </p>
                    </div>
                    <div className="rounded-xl bg-surface p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Order Status
                      </h3>
                      <p className="mt-2 font-medium capitalize text-primary">
                        {result.status.replace(/_/g, " ")}
                      </p>
                      <p className="mt-2 text-sm">
                        Payment Status: <span className="font-bold">{result.paymentStatus}</span>
                      </p>
                      <p className="text-sm">
                        Estimated Delivery:{" "}
                        <span className="font-bold">
                          {new Date(result.estimatedDelivery).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="font-bold">Tracking History</h3>
                    <OrderTrackingTimeline status={result.status} />
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
                  <Package className="mx-auto size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-xl font-bold">Order Not Found</h3>
                  <p className="mt-2 text-muted-foreground">
                    We couldn't find any order matching "{orderId}". Please check the number and try
                    again.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
