import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-tint px-5 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </section>
  );
}
