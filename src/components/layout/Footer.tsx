import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/categories";

const service = [
  { label: "Help centre", to: "/contact" },
  { label: "Track your order", to: "/account/orders" },
  { label: "Shipping & delivery", to: "/terms" },
  { label: "Returns & refunds", to: "/terms" },
  { label: "Payment options", to: "/terms" },
  { label: "Contact us", to: "/contact" },
];

const company = [
  { label: "About Marketplace", to: "/about" },
  { label: "Sell on Marketplace", to: "#" },
  { label: "Vendor handbook", to: "#" },
  { label: "Careers", to: "#" },
  { label: "Press", to: "#" },
  { label: "Affiliate programme", to: "#" },
];

const payments = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Klarna"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Bargainn Shop" className="h-10 w-auto object-contain" />
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
              <li key={s.label}>
                <a href={s.to} className="transition-colors hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Marketplace</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {company.map((s) => (
              <li key={s.label}>
                <a href={s.to} className="transition-colors hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
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
            <a href="/privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
