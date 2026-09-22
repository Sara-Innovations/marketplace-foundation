import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import { products } from "@/data/products";
import { toast } from "sonner";
import { Price } from "@/components/commerce/Price";

export const Route = createFileRoute("/account/wishlist")({
  head: () => ({
    meta: [{ title: "My Wishlist — Marketplace" }],
  }),
  component: AccountWishlist,
});

function AccountWishlist() {
  const { wishlist, toggleWishlist, addItem } = useCart();
  const wishProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  if (wishProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
        <Heart className="size-12 text-muted-foreground" strokeWidth={1.5} />
        <h2 className="mt-4 text-lg font-bold">Your wishlist is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Save items you like to view them later.
        </p>
        <Link
          to="/shop"
          className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wishlist</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wishProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="aspect-square w-full overflow-hidden"
            >
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="font-semibold hover:underline line-clamp-2"
              >
                {product.name}
              </Link>
              <div className="mt-2">
                <Price price={product.price} compareAtPrice={product.compareAtPrice} />
              </div>

              <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    addItem({ productId: product.id, quantity: 1 });
                    toast.success("Added to cart");
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink py-2 text-xs font-semibold text-ink-foreground hover:opacity-90"
                >
                  <ShoppingCart className="size-3.5" /> Add
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast("Removed from wishlist");
                  }}
                  className="grid size-8 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
