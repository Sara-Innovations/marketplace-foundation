import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";
import { PageShell } from "@/components/layout/PageShell";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "Create an Account — Marketplace" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    await new Promise((r) => setTimeout(r, 600)); // mock network delay
    login({ id: "u_new", name: data.name, email: data.email, phone: data.phone });
    toast.success("Account created successfully!");
    navigate({ to: "/account" });
  };

  return (
    <PageShell>
      <div className="shell flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the marketplace to start shopping.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground">Full Name</label>
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
              <label className="text-sm font-semibold text-foreground">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">Phone (Optional)</label>
              <input
                {...register("phone")}
                type="tel"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">Password</label>
              <input
                {...register("password")}
                type="password"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
