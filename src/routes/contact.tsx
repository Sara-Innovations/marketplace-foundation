import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | BargainShop" },
      { name: "description", content: "Get in touch with BargainShop customer support." },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof formSchema>;

const faqs = [
  {
    q: "How can I place an order?",
    a: "Simply browse our catalog, select the items you wish to purchase, add them to your cart, and proceed to checkout. You'll be guided through the shipping and payment process.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is confirmed, you can track its status by logging into your account and navigating to the 'Orders' section.",
  },
  {
    q: "How can I contact a seller?",
    a: "You can reach out to vendors directly from their store page or via the specific product page by clicking the 'Contact Seller' button.",
  },
  {
    q: "What payment methods are available?",
    a: "We support major Credit/Debit Cards, Mobile Banking (bKash, Nagad), and Cash on Delivery (COD) for eligible locations.",
  },
  {
    q: "How do I request a return?",
    a: "If your item arrives damaged or incorrectly fulfilled, you can request a return from the 'Orders' dashboard within 7 days of delivery.",
  },
];

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    toast.loading("Sending message...");
    await new Promise((r) => setTimeout(r, 1000));
    toast.dismiss();
    toast.success("Message sent successfully! We'll get back to you shortly.");
    reset();
  };

  return (
    <PageShell>
      <div className="shell py-6 pb-20">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        <div className="mt-4 rounded-3xl bg-surface px-6 py-12 sm:px-12 md:py-20">
          <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Have a question or need assistance? Fill out the form below or use our contact
            information to reach our support team.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-2xl font-bold">Get in Touch</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    123 Commerce Avenue
                    <br />
                    Tech District, Dhaka 1212
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="mt-1 text-sm text-muted-foreground">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">support@bargainshop.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">Business Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sunday - Thursday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">Your Name</label>
                  <input
                    {...register("name")}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">Phone Number</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="+880..."
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold">Subject</label>
                  <input
                    {...register("subject")}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Order Inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-2 w-full rounded-lg bg-ink px-6 py-3 font-semibold text-ink-foreground hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
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
        </div>
      </div>
    </PageShell>
  );
}
