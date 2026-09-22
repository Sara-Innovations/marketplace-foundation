/**
 * Mock transport layer. Every API module goes through `mockRequest` so the
 * whole data layer can be swapped for real HTTP calls later without touching
 * component code.
 */
export const MOCK_LATENCY_MS = 180;

// Future integration example using the base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.bargainnshop.com";

export function mockRequest<T>(data: T, latency = MOCK_LATENCY_MS): Promise<T> {
  // In the future, replace this with:
  // return fetch(`${API_BASE_URL}/endpoint`).then(res => res.json());
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), latency);
  });
}

export const queryKeys = {
  products: ["products"] as const,
  productList: (filter: string) => ["products", filter] as const,
  categories: ["categories"] as const,
  vendors: ["vendors"] as const,
  featuredVendors: ["vendors", "featured"] as const,
  flashSale: ["flash-sale"] as const,
  cart: ["cart"] as const,
};
