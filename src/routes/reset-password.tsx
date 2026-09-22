import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Reset Password — Marketplace" }, { name: "robots", content: "noindex" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Password reset successfully! You can now log in.");
    navigate({ to: "/login" });
  };

  return (
    <PageShell>
      <div className="shell flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Set new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground">New Password</label>
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
              <label className="text-sm font-semibold text-foreground">Confirm New Password</label>
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
              className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
