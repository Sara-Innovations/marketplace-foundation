import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  href = "#",
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  action?: ReactNode;
  href?: string | undefined;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action ?? (
        <a
          href={href}
          className="group flex items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          View all
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            strokeWidth={2}
          />
        </a>
      )}
    </div>
  );
}
