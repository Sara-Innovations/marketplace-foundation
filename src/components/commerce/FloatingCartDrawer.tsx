import React, { useState } from "react";
import { ShoppingBag, X, Minus, Plus, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/format";
import { products } from "@/data/products";
import { getProductById } from "@/api/products";
import { CompactProductCard } from "./CompactProductCard";

export function FloatingCartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  
  const cartProducts = items.map(item => ({
    ...item,
    product: products.find((p) => p.id === item.productId)
  })).filter(item => item.product != null);
  
  const total = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Recommended products for the bottom carousel
  const recommended = products.slice(0, 5);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center overflow-hidden rounded-l-lg border border-r-0 border-border bg-card shadow-xl transition-transform hover:-translate-x-1"
          aria-label="Open cart"
        >
          <div className="bg-primary w-full p-3 text-primary-foreground flex justify-center">
            <ShoppingBag className="size-6" />
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="text-sm font-semibold">{totalItems} Items</span>
            <span className="mt-1 font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full max-w-md flex-col p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider">Shopping Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Close <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          {cartProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingBag className="mb-4 size-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartProducts.map(({ product, quantity, id }) => (
                <div key={id} className="relative flex items-center gap-4 rounded-xl border border-border p-3 shadow-sm">
                  <button
                    onClick={() => removeItem(id)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="size-16 shrink-0 overflow-hidden rounded-md bg-surface">
                    <img src={product!.image} alt="" className="size-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="line-clamp-1 pr-6 text-sm font-medium">{product!.name}</h3>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(id, quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-muted-foreground">x</span>
                      <span className="font-semibold">{formatPrice(product!.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border bg-surface/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">You May Also Like</h3>
          </div>
          <div className="group relative">
            <button
              onClick={() => scroll(-1)}
              className="absolute -left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-md transition-all hover:bg-surface opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div ref={scrollRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar">
              {recommended.map((p) => (
                <div key={p.id} className="snap-start">
                  <CompactProductCard product={p} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(1)}
              className="absolute -right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-md transition-all hover:bg-surface opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-border bg-card p-4">
          <div className="mb-4 flex items-center justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-orange-500 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-600"
          >
            Checkout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
