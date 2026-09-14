import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  items: Record<string, number>;
  wishlist: string[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  toggleWishlist: (productId: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      wishlist: [],
      addItem: (productId, quantity = 1) =>
        set((s) => ({
          items: { ...s.items, [productId]: (s.items[productId] ?? 0) + quantity },
        })),
      removeItem: (productId) =>
        set((s) => {
          const next = { ...s.items };
          delete next[productId];
          return { items: next };
        }),
      setQuantity: (productId, quantity) =>
        set((s) => {
          if (quantity <= 0) {
            const next = { ...s.items };
            delete next[productId];
            return { items: next };
          }
          return { items: { ...s.items, [productId]: quantity } };
        }),
      clear: () => set({ items: {} }),
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
    }),
    { name: "marketplace-cart" },
  ),
);

export const useCartCount = () =>
  useCart((s) => Object.values(s.items).reduce((sum, q) => sum + q, 0));

export const useWishlistCount = () => useCart((s) => s.wishlist.length);
