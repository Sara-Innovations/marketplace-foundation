import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Package, CreditCard, Truck, RefreshCcw, User, Store } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Centre | BargainShop" },
      { name: "description", content: "Get support and answers to your questions." },
    ],
  }),
  component: HelpCentrePage,
});

const faqCategories = [
  {
    id: "orders",
    title: "Orders",
    icon: Package,
    faqs: [
      {
        q: "How do I place an order?",
        a: "Browse our products, select your desired items, add them to the cart, and proceed to checkout.",
      },
      {
        q: "How can I cancel my order?",
        a: "You can cancel your order from the 'My Orders' section in your account dashboard before it ships.",
      },
      {
        q: "How can I check my order status?",
        a: "Log into your account and navigate to 'My Orders' to see real-time updates.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: CreditCard,
    faqs: [
      {
        q: "What payment methods are available?",
        a: "We accept Visa, Mastercard, PayPal, and Mobile Banking solutions.",
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Yes, COD is available for most locations nationwide.",
      },
      {
        q: "Why did my payment fail?",
        a: "Payment failures can occur due to insufficient funds, incorrect card details, or network issues. Try another method.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    icon: Truck,
    faqs: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3-5 business days. Express shipping takes 1-2 days.",
      },
      {
        q: "How can I track my order?",
        a: "Use the tracking link sent to your email or visit the 'Track Order' page.",
      },
      {
        q: "What are the delivery charges?",
        a: "Charges vary by location and vendor. Orders over ৳5000 often qualify for free shipping.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: RefreshCcw,
    faqs: [
      {
        q: "How do I return a product?",
        a: "Initiate a return request from your order dashboard within 7 days of delivery.",
      },
      {
        q: "How long does a refund take?",
        a: "Refunds are processed within 5-7 business days after the returned item is inspected.",
      },
      {
        q: "What products are eligible for return?",
        a: "Most physical goods in original condition are eligible. Digital goods and perishables are not.",
      },
    ],
  },
  {
    id: "account",
    title: "Account",
    icon: User,
    faqs: [
      {
        q: "How do I create an account?",
        a: "Click on 'Register' in the top right corner and fill in your details.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login screen to receive a reset link.",
      },
      {
        q: "How do I change my address?",
        a: "You can manage your addresses in the 'Addresses' section of your account dashboard.",
      },
    ],
  },
  {
    id: "sellers",
    title: "Sellers",
    icon: Store,
    faqs: [
      {
        q: "How can I become a seller?",
        a: "Visit our 'Sell on BargainShop' page and register for a vendor account.",
      },
      {
        q: "How can I contact a seller?",
        a: "Use the 'Contact Seller' button on any product page or store profile.",
      },
    ],
  },
];

function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.faqs.length > 0);

  return (
    <PageShell>
      <div className="shell pb-20">
        {/* Hero */}
        <div className="mt-6 rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:py-24">
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            How can we help you?
          </h1>
          <div className="mx-auto mt-8 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help... (e.g., refunds, shipping)"
              className="w-full rounded-full border-0 bg-background px-12 py-4 text-base text-foreground shadow-sm focus:ring-2 focus:ring-ring outline-none"
            />
          </div>
        </div>

        {/* Categories Grid (only show when not searching) */}
        {!searchQuery && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary hover:bg-surface"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <cat.icon className="size-6" />
                </div>
                <h3 className="font-bold text-lg">{cat.title}</h3>
              </a>
            ))}
          </div>
        )}

        {/* FAQs */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <cat.icon className="size-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">{cat.title}</h2>
                </div>
                <div className="rounded-2xl border border-border bg-card p-2 sm:p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {cat.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`item-${cat.id}-${i}`}>
                        <AccordionTrigger className="text-left font-bold sm:text-lg px-2 sm:px-0">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base px-2 sm:px-0">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold">No results found for "{searchQuery}"</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search terms or contact support.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 text-center rounded-3xl bg-surface px-6 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Still need help?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our support team is always ready to assist you.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
