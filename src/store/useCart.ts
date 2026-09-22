import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string; // e.g. productId-color-size
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

type CartState = {
  items: CartItem[];
  wishlist: string[];
  coupon: string | null;
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  setCoupon: (code: string | null) => void;
  toggleWishlist: (productId: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      coupon: null,
      addItem: (item) =>
        set((s) => {
          const id = item.id || `${item.productId}-${item.color || ""}-${item.size || ""}`;
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, id }] };
        }),
      removeItem: (id) =>
        set((s) => ({
          items: s.items.filter((i) => i.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((s) => {
          if (quantity <= 0) {
            return { items: s.items.filter((i) => i.id !== id) };
          }
          return {
            items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
          };
        }),
      clear: () => set({ items: [], coupon: null }),
      setCoupon: (code) => set({ coupon: code }),
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
    }),
    {
      name: "marketplace-cart",
      version: 1, // bump version to bust old persisted object state
    },
  ),
);

export const useCartCount = () =>
  useCart((s) =>
    Array.isArray(s.items) ? s.items.reduce((sum, item) => sum + item.quantity, 0) : 0,
  );

export const useWishlistCount = () => useCart((s) => s.wishlist.length);
