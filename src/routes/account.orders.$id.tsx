import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Package, Truck, ChevronLeft, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/orders/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Order ${params.id} — Marketplace` }],
  }),
  component: OrderDetails,
});

function OrderDetails() {
  const { id } = Route.useParams();
  const currentStep = 2; // 0=Placed, 1=Confirmed, 2=Processing, 3=Shipped, 4=Out, 5=Delivered
  const steps = [
    { label: "Placed", icon: Clock },
    { label: "Confirmed", icon: Check },
    { label: "Processing", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/account/orders"
          className="mb-4 inline-flex items-center text-sm font-semibold text-primary hover:underline"
        >
          <ChevronLeft className="mr-1 size-4" /> Back to orders
        </Link>
        <h2 className="text-2xl font-bold">Order {id}</h2>
        <p className="text-sm text-muted-foreground">Placed on March 12, 2024</p>
      </div>

      {/* Visual Timeline */}
      <div className="rounded-2xl border border-border bg-card p-6 overflow-hidden">
        <h3 className="font-bold">Tracking Status</h3>
        <p className="text-sm text-muted-foreground mt-1">Estimated delivery: March 15, 2024</p>

        <div className="relative mt-8 flex justify-between px-2 sm:px-6">
          <div className="absolute top-4 left-6 right-6 h-1 -translate-y-1/2 bg-surface" />
          <div
            className="absolute top-4 left-6 h-1 -translate-y-1/2 bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, i) => (
            <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "grid size-8 place-items-center rounded-full border-2 bg-card transition-colors",
                  i <= currentStep
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground",
                  i === currentStep && "bg-primary text-primary-foreground",
                )}
              >
                <step.icon className="size-4" strokeWidth={2.5} />
              </div>
              <span
                className={cn(
                  "hidden text-xs font-semibold sm:block",
                  i <= currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-surface px-6 py-4 font-bold">Order Items</div>
          <ul className="divide-y divide-border">
            {/* Mock items */}
            {[1, 2].map((item) => (
              <li key={item} className="flex gap-4 p-6">
                <div className="size-20 shrink-0 rounded-lg bg-surface" />
                <div>
                  <p className="font-semibold">Mock Product Name {item}</p>
                  <p className="text-xs text-muted-foreground">Vendor: Awesome Store</p>
                  <p className="mt-2 font-bold">
                    $49.99 <span className="text-xs font-normal text-muted-foreground">× 1</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold">Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">$99.98</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-semibold">$5.00</dd>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <dt>Total</dt>
                <dd>$104.98</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <h3 className="font-bold">Shipping Address</h3>
            <p className="mt-2 font-semibold">Alex Test</p>
            <p>123 Main Street</p>
            <p>New York, NY 10001</p>
          </div>
        </div>
      </div>
    </div>
  );
}
