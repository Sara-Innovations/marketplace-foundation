import { useState } from "react";
import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronRight, CreditCard, MapPin, Truck } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { products } from "@/data/products";
import { PageShell } from "@/components/layout/PageShell";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  beforeLoad: () => {
    if (!useAuth.getState().isAuthenticated) {
      throw redirect({ to: "/login" });
    }
    if (useCart.getState().items.length === 0) {
      throw redirect({ to: "/cart" });
    }
  },
  head: () => ({
    meta: [{ title: "Checkout — Marketplace" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutPage,
});

const addressSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

type AddressForm = z.infer<typeof addressSchema>;

const STEPS = ["Address", "Delivery", "Payment", "Review"];

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<AddressForm | null>(null);
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"cod" | "card" | "mobile">("card");
  const [orderId, setOrderId] = useState<string | null>(null);

  const { items, coupon, clear } = useCart();
  const navigate = useNavigate();

  const cartProducts = items
    .map((item) => ({
      cartItem: item,
      product: products.find((p) => p.id === item.productId)!,
    }))
    .filter((x) => x.product);

  const subtotal = cartProducts.reduce(
    (sum, { cartItem, product }) => sum + product.price * cartItem.quantity,
    0,
  );
  const discountAmount = coupon ? subtotal * 0.1 : 0; // Fixed 10% for mock
  const shipping = delivery === "express" ? 15 : 5;
  const total = subtotal - discountAmount + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {},
  });

  const onAddressSubmit = (data: AddressForm) => {
    setAddress(data);
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    toast.loading("Processing order...");
    await new Promise((r) => setTimeout(r, 1500));
    toast.dismiss();
    toast.success("Order placed successfully!");
    setOrderId(`ORD-${Math.floor(Math.random() * 1000000)}`);
    clear();
  };

  if (orderId) {
    return (
      <PageShell>
        <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-success/10 text-success">
            <Check className="size-10" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order number is{" "}
            <strong className="text-foreground">{orderId}</strong>.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/account/orders"
              className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-surface"
            >
              Track Order
            </Link>
            <Link
              to="/shop"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="shell pt-6 pb-20">
        <h1 className="font-display text-3xl font-bold text-foreground">Checkout</h1>

        <div className="mt-6 mb-10 flex items-center justify-between lg:justify-start lg:gap-4 overflow-x-auto pb-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 items-center rounded-full px-4 text-sm font-bold transition-colors",
                  step === i
                    ? "bg-primary text-primary-foreground"
                    : step > i
                      ? "bg-success/20 text-success"
                      : "bg-surface text-muted-foreground",
                )}
              >
                {step > i && <Check className="mr-1.5 size-4" strokeWidth={3} />}
                {i + 1}. {s}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="mx-1 size-4 text-muted-foreground lg:mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            {step === 0 && (
              <form
                onSubmit={handleSubmit(onAddressSubmit)}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <MapPin className="size-5 text-primary" /> Shipping Address
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold">Full Name</label>
                    <input
                      {...register("fullName")}
                      className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold">Phone</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold">Address</label>
                    <input
                      {...register("address")}
                      className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold">City</label>
                    <input
                      {...register("city")}
                      className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Postal Code</label>
                    <input
                      {...register("postalCode")}
                      className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-destructive">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 rounded-lg bg-ink px-6 py-3 font-semibold text-ink-foreground hover:opacity-90"
                >
                  Continue to Delivery
                </button>
              </form>
            )}

            {step === 1 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Truck className="size-5 text-primary" /> Delivery Method
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => setDelivery("standard")}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors",
                      delivery === "standard"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="font-bold">Standard Delivery</div>
                    <div className="mt-1 text-sm text-muted-foreground">3-5 business days</div>
                    <div className="mt-2 font-semibold">$5.00</div>
                  </button>
                  <button
                    onClick={() => setDelivery("express")}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors",
                      delivery === "express"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="font-bold">Express Delivery</div>
                    <div className="mt-1 text-sm text-muted-foreground">1-2 business days</div>
                    <div className="mt-2 font-semibold">$15.00</div>
                  </button>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-surface"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-lg bg-ink px-6 py-3 font-semibold text-ink-foreground hover:opacity-90"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <CreditCard className="size-5 text-primary" /> Payment Method
                </h2>
                <div className="grid gap-3">
                  {(["card", "mobile", "cod"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setPayment(m)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 transition-colors",
                        payment === m
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <span className="font-bold">
                        {m === "card"
                          ? "Credit / Debit Card"
                          : m === "mobile"
                            ? "Mobile Banking"
                            : "Cash on Delivery"}
                      </span>
                      <div
                        className={cn(
                          "grid size-5 place-items-center rounded-full border-2",
                          payment === m ? "border-primary" : "border-muted",
                        )}
                      >
                        {payment === m && <div className="size-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="mt-4 rounded-xl border border-border bg-surface p-4">
                    <p className="text-sm text-muted-foreground">
                      This is a mock checkout. No real payment details are needed.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-surface"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="rounded-lg bg-ink px-6 py-3 font-semibold text-ink-foreground hover:opacity-90"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold">Review Your Order</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-border p-4 text-sm">
                    <h3 className="font-bold text-muted-foreground">Shipping To</h3>
                    <p className="mt-2 font-semibold">{address?.fullName}</p>
                    <p>{address?.address}</p>
                    <p>
                      {address?.city}, {address?.postalCode}
                    </p>
                    <button
                      onClick={() => setStep(0)}
                      className="mt-2 font-semibold text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="rounded-xl border border-border p-4 text-sm">
                    <h3 className="font-bold text-muted-foreground">Payment & Delivery</h3>
                    <p className="mt-2 font-semibold capitalize">
                      {payment.replace("cod", "Cash on Delivery")}
                    </p>
                    <p className="capitalize">{delivery} Delivery</p>
                    <button
                      onClick={() => setStep(1)}
                      className="mt-2 font-semibold text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-3 font-bold text-muted-foreground">
                    Items ({cartProducts.length})
                  </h3>
                  <ul className="divide-y divide-border rounded-xl border border-border">
                    {cartProducts.map(({ cartItem, product }) => (
                      <li key={cartItem.id} className="flex gap-4 p-4 text-sm">
                        <img src={product.image} alt="" className="size-16 rounded object-cover" />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-muted-foreground">Qty: {cartItem.quantity}</p>
                          <p className="font-bold">${product.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-surface"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="font-bold text-foreground">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success">
                  <dt>Discount</dt>
                  <dd className="font-semibold">-${discountAmount.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-semibold">${shipping.toFixed(2)}</dd>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
