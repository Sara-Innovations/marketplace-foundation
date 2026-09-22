import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart, type CartItem } from "@/store/useCart";
import { products } from "@/data/products";
import { vendors } from "@/data/vendors";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CouponInput, COUPONS } from "@/components/commerce/CouponInput";
import { Price } from "@/components/commerce/Price";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Shopping Cart — Marketplace" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQuantity, removeItem, toggleWishlist, wishlist, coupon } = useCart();

  // In a real app we'd fetch this batch of products.
  // For mock we can just find them synchronously or via react-query mock Request.
  const cartProducts = items
    .map((item) => ({
      cartItem: item,
      product: products.find((p) => p.id === item.productId)!,
    }))
    .filter((x) => x.product);

  // Group by vendor
  const grouped = cartProducts.reduce(
    (acc, curr) => {
      const vid = curr.product.vendorId;
      if (!acc[vid]) acc[vid] = { vendor: vendors.find((v) => v.id === vid)!, items: [] };
      acc[vid].items.push(curr);
      return acc;
    },
    {} as Record<string, { vendor: (typeof vendors)[0]; items: typeof cartProducts }>,
  );

  // Calculations
  const subtotal = cartProducts.reduce(
    (sum, { cartItem, product }) => sum + product.price * cartItem.quantity,
    0,
  );
  const discountAmount = coupon ? subtotal * (COUPONS[coupon] / 100) : 0;
  const total = subtotal - discountAmount;

  if (cartProducts.length === 0) {
    return (
      <PageShell>
        <div className="shell flex flex-col items-center justify-center py-32">
          <div className="grid size-20 place-items-center rounded-full bg-surface">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Link
            to="/shop"
            className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Continue shopping
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: "Cart" }]} />
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground">Shopping Cart</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            {Object.values(grouped).map(({ vendor, items }) => (
              <div
                key={vendor.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-3">
                  <img src={vendor.logo} alt="" className="size-6 rounded-full object-cover" />
                  <span className="font-semibold">{vendor.name}</span>
                </div>
                <ul className="divide-y divide-border">
                  {items.map(({ cartItem, product }) => (
                    <li key={cartItem.id} className="flex gap-4 p-5">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        className="shrink-0"
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="size-24 rounded-lg object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                          <Link
                            to="/product/$slug"
                            params={{ slug: product.slug }}
                            className="font-semibold hover:underline"
                          >
                            {product.name}
                          </Link>
                          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
                        </div>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {cartItem.color && <span>Color: {cartItem.color}</span>}
                          {cartItem.size && <span>Size: {cartItem.size}</span>}
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center rounded-lg border border-border">
                            <button
                              onClick={() => setQuantity(cartItem.id, cartItem.quantity - 1)}
                              className="grid size-8 place-items-center hover:bg-surface"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(
                                  cartItem.id,
                                  Math.min(product.stock, cartItem.quantity + 1),
                                )
                              }
                              className="grid size-8 place-items-center hover:bg-surface"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-surface"
                            >
                              <Heart
                                className={`size-4 ${wishlist.includes(product.id) ? "fill-sale text-sale" : ""}`}
                              />
                              Save
                            </button>
                            <button
                              onClick={() => removeItem(cartItem.id)}
                              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="size-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-bold text-foreground">Order Summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <dt>Discount ({coupon})</dt>
                    <dd className="font-semibold">-${discountAmount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold">Calculated at checkout</dd>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-bold">Have a promo code?</h3>
              <CouponInput />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
