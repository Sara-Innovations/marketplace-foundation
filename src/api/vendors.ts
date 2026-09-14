import { vendors } from "@/data/vendors";
import type { Vendor } from "@/data/types";
import { mockRequest } from "./client";

export function getVendors(): Promise<Vendor[]> {
  return mockRequest(vendors);
}

export function getFeaturedVendors(limit = 4): Promise<Vendor[]> {
  return mockRequest([...vendors].sort((a, b) => b.rating - a.rating).slice(0, limit));
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}
