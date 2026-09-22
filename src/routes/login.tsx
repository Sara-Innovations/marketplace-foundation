import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";
import { PageShell } from "@/components/layout/PageShell";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Log In — Marketplace" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    // Mock login delay
    await new Promise((r) => setTimeout(r, 600));

    if (data.email === "test@example.com" && data.password === "password") {
      login({ id: "u_1", name: "Alex Test", email: data.email });
      toast.success("Successfully logged in");
      navigate({ to: "/account" });
    } else {
      // For mock purposes, let them login with anything
      login({ id: "u_random", name: "Guest User", email: data.email });
      toast.success("Successfully logged in");
      navigate({ to: "/account" });
    }
  };

  return (
    <PageShell>
      <div className="shell flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground">Email or phone</label>
              <input
                {...register("email")}
                autoComplete="email"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                {...register("password")}
                type="password"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="size-4 rounded border-input"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
