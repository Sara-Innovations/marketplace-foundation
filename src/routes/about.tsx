import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Tag, ShieldCheck, Truck, Headphones, Users } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | BargainShop" },
      {
        name: "description",
        content: "Learn more about BargainShop, your trusted multi-vendor online marketplace.",
      },
    ],
  }),
  component: AboutPage,
});

const features = [
  {
    icon: ShoppingBag,
    title: "Wide Product Selection",
    desc: "Access thousands of products across diverse categories from trusted sellers.",
  },
  {
    icon: Tag,
    title: "Competitive Prices",
    desc: "Discover daily flash deals, exclusive coupons, and unbeatable bargains.",
  },
  {
    icon: Users,
    title: "Multiple Vendors",
    desc: "Compare products and prices from different vendors to find exactly what you need.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    desc: "Your data is protected with industry-standard security and trusted payment gateways.",
  },
  {
    icon: Truck,
    title: "Convenient Delivery",
    desc: "Choose between standard and express shipping options right to your doorstep.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Our dedicated support team is available to assist you with any inquiries.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <div className="shell py-6 pb-20">
        <Breadcrumbs items={[{ label: "About Us" }]} />

        {/* Hero */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-ink text-ink-foreground">
          <div className="flex flex-col items-center px-6 py-20 text-center md:py-28">
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              BargainShop — Smart Shopping, Better Deals
            </h1>
            <p className="mt-6 max-w-2xl text-lg opacity-80 sm:text-xl">
              We are Bangladesh's fastest-growing multi-vendor online marketplace, connecting
              shoppers with thousands of trusted independent sellers.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About BargainShop
            </h2>
            <div className="prose prose-slate mt-6 text-muted-foreground">
              <p>
                BargainShop was founded with a simple vision: to create a seamless digital
                marketplace where independent sellers can thrive, and customers can discover exactly
                what they need at the best possible price.
              </p>
              <p>
                As a multi-vendor marketplace, we don't just sell products ourselves—we provide a
                robust platform for vendors across the country to showcase their inventory directly
                to you. This competitive ecosystem ensures that you always have access to a massive
                variety of goods, competitive pricing, and authentic customer reviews.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 rounded-2xl bg-surface/80" />
            <div className="mt-8 h-64 rounded-2xl bg-surface" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground">
            Why Shop With Us
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
              >
                <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-6 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 rounded-3xl bg-surface px-6 py-16 sm:px-12 lg:py-24">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-5 relative">
            <div className="hidden sm:block absolute top-6 left-10 right-10 h-0.5 bg-border" />
            {[
              "Discover Products",
              "Compare & Choose",
              "Add to Cart",
              "Checkout",
              "Receive Your Order",
            ].map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center text-center">
                <div className="grid size-12 place-items-center rounded-full border-4 border-surface bg-primary text-xl font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-bold">{step}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Ready to discover great deals?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of customers already shopping on BargainShop.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground hover:bg-primary/90"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
