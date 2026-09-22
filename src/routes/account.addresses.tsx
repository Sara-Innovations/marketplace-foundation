import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/account/addresses")({
  head: () => ({
    meta: [{ title: "My Addresses — Marketplace" }],
  }),
  component: AccountAddresses,
});

const mockAddresses = [
  {
    id: 1,
    name: "Alex Test",
    phone: "555-019-2831",
    street: "123 Main Street",
    city: "New York",
    zip: "10001",
    isDefault: true,
  },
  {
    id: 2,
    name: "Alex Test",
    phone: "555-019-2831",
    street: "456 Office Blvd, Floor 4",
    city: "San Francisco",
    zip: "94105",
    isDefault: false,
  },
];

function AccountAddresses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button
          onClick={() => toast("Address form would open here")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add New
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockAddresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              "relative rounded-xl border p-5",
              addr.isDefault ? "border-primary bg-primary/5" : "border-border bg-card",
            )}
          >
            {addr.isDefault && (
              <span className="absolute right-5 top-5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Default
              </span>
            )}
            <div className="flex items-start gap-3">
              <MapPin
                className={cn(
                  "mt-0.5 size-5",
                  addr.isDefault ? "text-primary" : "text-muted-foreground",
                )}
              />
              <div>
                <p className="font-bold">{addr.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{addr.phone}</p>
                <p className="mt-2 text-sm">{addr.street}</p>
                <p className="text-sm">
                  {addr.city}, {addr.zip}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                <Edit2 className="size-3.5" /> Edit
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-destructive hover:underline">
                <Trash2 className="size-3.5" /> Delete
              </button>
              {!addr.isDefault && (
                <button className="ml-auto text-xs font-semibold text-muted-foreground hover:text-foreground">
                  Set as default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
