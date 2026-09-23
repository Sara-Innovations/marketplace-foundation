export type CategoryChild = string | {
  name: string;
  slug?: string;
  children?: CategoryChild[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description?: string;
  banner?: string;
  children?: CategoryChild[];
};

export type Vendor = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  cover: string;
  location: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  followers: number;
  verified: boolean;
  tagline: string;
  about?: string;
  since?: number;
};

export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: string;
  subcategory: string;
  brand: string;
  vendorId: string;
  sku: string;
  sold: number;
  stock: number;
  freeShipping: boolean;
  createdAt: string;
  description: string;
  highlights: string[];
  specs: Spec[];
  colors: string[];
  sizes: string[];
  tags: ("trending" | "best-seller" | "new" | "flash")[];
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
  images: string[];
};

export type FlashSale = {
  id: string;
  title: string;
  subtitle: string;
  endsAt: string;
  productIds: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};
