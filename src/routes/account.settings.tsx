import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/account/settings")({
  head: () => ({
    meta: [{ title: "Settings — Marketplace" }],
  }),
  component: AccountSettings,
});

function AccountSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Settings</h2>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-bold">Profile Details</h3>
        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Settings saved");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                defaultValue="Alex Test"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Email Address</label>
              <input
                type="email"
                defaultValue="test@example.com"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                type="tel"
                defaultValue="555-019-2831"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
