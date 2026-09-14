/**
 * Mock transport layer. Every API module goes through `mockRequest` so the
 * whole data layer can be swapped for real HTTP calls later without touching
 * component code.
 */
export const MOCK_LATENCY_MS = 180;

export function mockRequest<T>(data: T, latency = MOCK_LATENCY_MS): Promise<T> {
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
