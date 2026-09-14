import type { Category } from "./types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const categories: Category[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    image: img("photo-1498049794561-7780e7231661"),
    itemCount: 12840,
    children: ["Audio", "Phones", "Laptops", "Cameras", "Wearables"],
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    image: img("photo-1483985988355-763728e1935b"),
    itemCount: 24310,
    children: ["Men", "Women", "Shoes", "Bags", "Watches"],
  },
  {
    id: "cat-home",
    name: "Home & Living",
    slug: "home-living",
    image: img("photo-1555041469-a586c61ea9bc"),
    itemCount: 9120,
    children: ["Furniture", "Kitchen", "Decor", "Lighting"],
  },
  {
    id: "cat-beauty",
    name: "Beauty",
    slug: "beauty",
    image: img("photo-1596462502278-27bfdc403348"),
    itemCount: 6740,
    children: ["Skincare", "Fragrance", "Makeup"],
  },
  {
    id: "cat-sports",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image: img("photo-1517649763962-0c623066013b"),
    itemCount: 5310,
    children: ["Fitness", "Running", "Camping"],
  },
  {
    id: "cat-toys",
    name: "Toys & Games",
    slug: "toys-games",
    image: img("photo-1558060370-d644479cb6f7"),
    itemCount: 3980,
    children: ["Board Games", "Building", "Outdoor Play"],
  },
  {
    id: "cat-grocery",
    name: "Grocery",
    slug: "grocery",
    image: img("photo-1542838132-92c53300491e"),
    itemCount: 7460,
    children: ["Coffee", "Snacks", "Organic"],
  },
  {
    id: "cat-auto",
    name: "Automotive",
    slug: "automotive",
    image: img("photo-1492144534655-ae79c964c9d7"),
    itemCount: 2870,
    children: ["Accessories", "Care", "Tools"],
  },
];
