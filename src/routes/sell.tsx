import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Users, Box, ShieldCheck, Headphones, Store, HelpCircle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell on BargainShop | Become a Vendor" },
      {
        name: "description",
        content: "Join BargainShop as a seller and grow your business today.",
      },
    ],
  }),
  component: SellPage,
});

const reasons = [
  {
    icon: Users,
    title: "Reach More Customers",
    desc: "Gain instant access to millions of active shoppers across the country.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    desc: "Boost your sales and scale your operations with our marketing tools.",
  },
  {
    icon: Box,
    title: "Easy Product Management",
    desc: "Upload and manage your inventory easily through our vendor portal.",
  },
  {
    icon: Store,
    title: "Marketplace Exposure",
    desc: "Benefit from our platform's SEO and promotional campaigns.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Order Process",
    desc: "Guaranteed secure payments and reliable fraud protection.",
  },
  {
    icon: Headphones,
    title: "Seller Support",
    desc: "Dedicated support team to help you succeed on our platform.",
  },
];

const faqs = [
  {
    q: "How can I become a seller?",
    a: "Simply click 'Start Selling', create a vendor account, and submit your business details for verification.",
  },
  {
    q: "What documents are required?",
    a: "You'll need a valid Trade License, NID/Passport copy of the owner, and active bank account details.",
  },
  {
    q: "How do seller fees work?",
    a: "We charge a small commission on successful sales. There are no hidden fees or monthly subscription charges.",
  },
  {
    q: "How do I receive orders?",
    a: "You will be notified via email and through your Vendor Dashboard whenever a customer places an order.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are processed securely and disbursed directly to your registered bank account on a bi-weekly schedule.",
  },
];

function SellPage() {
  return (
    <PageShell>
      <div className="shell pb-20">
        {/* Hero */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-ink text-ink-foreground">
          <div className="flex flex-col items-center px-6 py-20 text-center md:py-28">
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Sell on BargainShop
            </h1>
            <p className="mt-6 max-w-2xl text-lg opacity-80 sm:text-xl">
              Join thousands of businesses and sellers who are growing their brand and reaching
              millions of customers on our marketplace.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                search={{ role: "vendor" }}
                className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground hover:bg-primary/90"
              >
                Start Selling
              </Link>
              <a
                href="#how-it-works"
                className="rounded-full bg-surface px-8 py-4 font-bold text-foreground hover:bg-surface/80"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Why Sell */}
        <div className="mt-24">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground">
            Why Sell on BargainShop?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((f) => (
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
        <div
          id="how-it-works"
          className="mt-24 rounded-3xl bg-surface px-6 py-16 sm:px-12 lg:py-24"
        >
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground">
            How Selling Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-5 relative">
            <div className="hidden sm:block absolute top-6 left-10 right-10 h-0.5 bg-border" />
            {[
              "Create your seller account",
              "Set up your store",
              "Add your products",
              "Receive orders",
              "Grow your business",
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

        {/* FAQ Section */}
        <div className="mt-24 mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary mb-4">
              <HelpCircle className="size-6" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Seller FAQ
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-bold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center rounded-3xl bg-primary/5 px-6 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Ready to start your journey?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Set up your shop today and start accepting orders.
          </p>
          <Link
            to="/register"
            search={{ role: "vendor" }}
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground hover:bg-primary/90"
          >
            Start Selling Now
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
