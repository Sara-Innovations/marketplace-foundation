import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HeroProductCarousel } from "@/components/home/HeroProductCarousel";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FlashDeals } from "@/components/home/FlashDeals";
import { ProductSection } from "@/components/home/ProductSection";
import { FeaturedStores } from "@/components/home/FeaturedStores";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Newsletter } from "@/components/home/Newsletter";

const title = "Marketplace — Shop 12,000+ Independent Sellers";
const description =
  "Discover trending products, flash deals and best sellers from verified independent stores. Free shipping over $75 and 30-day returns.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <HeroProductCarousel />
        <FeaturedCategories />
        <FlashDeals />
        <ProductSection
          filter="trending"
          eyebrow="Popular now"
          title="Trending products"
          description="What shoppers are adding to cart this week."
          href="/trending"
          variant="carousel"
        />
        <ProductSection
          filter="best-seller"
          eyebrow="Proven"
          title="Best sellers"
          description="Highest-rated products across every department."
          href="/best-sellers"
        />
        <FeaturedStores />
        <PromoBanner />
        <ProductSection
          filter="new"
          eyebrow="Just landed"
          title="New arrivals"
          description="Fresh listings from stores you'll want to follow."
          href="/new"
          variant="carousel"
        />
        <ProductSection
          filter="best-seller"
          eyebrow="For you"
          title="Recommended products"
          description="Based on what's trending in your favorite categories."
          href="/recommended"
        />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
