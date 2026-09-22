import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Forgot Password — Marketplace" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Reset link sent!");
  };

  return (
    <PageShell>
      <div className="shell flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Reset Password</h1>

          {isSubmitSuccessful ? (
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-block w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 text-left space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">Email address</label>
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </button>
              </form>

              <div className="mt-6 text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
