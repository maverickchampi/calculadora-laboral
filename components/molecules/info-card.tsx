import type { ReactNode } from "react";

interface InfoCardProps {
  title?: string;
  children: ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
      {title ? (
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}
