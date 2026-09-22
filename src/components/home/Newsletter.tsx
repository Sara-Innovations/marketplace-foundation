import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="border-t border-border bg-ink">
      <div className="shell py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 grid size-12 place-items-center rounded-2xl bg-white/10 text-white">
            <Mail className="size-6" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get deals before everyone else
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Subscribe to receive weekly drops, flash sales, and discover new premium stores. No
            spam, ever.
          </p>

          <form
            className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-2 backdrop-blur focus-within:ring-2 focus-within:ring-white/50"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setEmail("");
              toast.success("You're subscribed", {
                description: "Watch your inbox for the first drop.",
              });
            }}
          >
            <label className="sr-only" htmlFor="homepage-newsletter-email">
              Email address
            </label>
            <input
              id="homepage-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-white/90"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-white/50">
            By subscribing you agree to our Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
