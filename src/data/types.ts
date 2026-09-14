export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  children?: string[];
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
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: string;
  vendorId: string;
  sold: number;
  stock: number;
  freeShipping: boolean;
  tags: ("trending" | "best-seller" | "new" | "flash")[];
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
