import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, sections, children }: LegalLayoutProps) {
  return (
    <PageShell>
      <div className="shell py-6 pb-20">
        <Breadcrumbs items={[{ label: title }]} />

        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 w-full shrink-0 lg:w-72">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-bold text-foreground">Table of Contents</h2>
              <nav className="mt-4 flex flex-col space-y-2">
                {sections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-start text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="mr-2 text-xs opacity-60">{idx + 1}.</span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-6 rounded-2xl bg-surface p-6">
              <h3 className="font-bold">Need Help?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If you have any questions about this document, please contact our support team.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-block font-semibold text-primary hover:underline"
              >
                Contact Us &rarr;
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>

            <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-primary hover:prose-a:underline">
              {children}
            </div>
          </main>
        </div>
      </div>
    </PageShell>
  );
}
