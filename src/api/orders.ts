export type OrderStatus =
  "placed" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered";

export interface OrderTrackResult {
  id: string;
  date: string;
  total: number;
  paymentStatus: string;
  deliveryAddress: string;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
  courier: string;
}

const mockOrders: Record<string, OrderTrackResult> = {
  "BS-2026-001245": {
    id: "BS-2026-001245",
    date: "2026-09-20",
    total: 4500,
    paymentStatus: "Paid",
    deliveryAddress: "123 Commerce Avenue, Tech District, Dhaka 1212",
    status: "shipped",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2026-09-24",
    courier: "FastShip Logistics",
  },
  "BS-2026-001246": {
    id: "BS-2026-001246",
    date: "2026-09-18",
    total: 1250,
    paymentStatus: "Cash on Delivery",
    deliveryAddress: "45 River Road, Block C, Sylhet",
    status: "delivered",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2026-09-21",
    courier: "Nationwide Courier",
  },
};

export async function trackOrder(orderId: string): Promise<OrderTrackResult | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedId = orderId.trim().toUpperCase();
  return mockOrders[normalizedId] || null;
}
