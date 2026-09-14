import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/categories";

const service = [
  "Help centre",
  "Track your order",
  "Shipping & delivery",
  "Returns & refunds",
  "Payment options",
  "Contact us",
];

const company = [
  "About Marketplace",
  "Sell on Marketplace",
  "Vendor handbook",
  "Careers",
  "Press",
  "Affiliate programme",
];

const payments = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Klarna"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
              M
            </span>
            <span className="font-display text-lg font-bold">Marketplace</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A curated multi-vendor marketplace connecting 12,000+ independent sellers with shoppers
            in 40 countries.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="size-4" strokeWidth={1.8} /> 118 Harbour Street, Portland, OR
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" strokeWidth={1.8} /> +1 (555) 018-4420
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" strokeWidth={1.8} /> support@marketplace.example
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="grid size-9 place-items-center rounded-lg border border-border bg-card transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Categories</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <a href={`/category/${c.slug}`} className="transition-colors hover:text-foreground">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Customer service</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {service.map((s) => (
              <li key={s}>
                <a href="#" className="transition-colors hover:text-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Marketplace</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {company.map((s) => (
              <li key={s}>
                <a href="#" className="transition-colors hover:text-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-base font-semibold">Get deals before everyone else</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly drops, flash sales and new stores. No spam.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setEmail("");
              toast.success("You're subscribed", { description: "Watch your inbox for the first drop." });
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1 rounded-lg border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col items-center gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Marketplace Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
