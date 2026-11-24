import Link from "next/link";
import type { CalculatorLink } from "@/lib/constants/calculators";

interface CalculatorLinksProps {
  items: CalculatorLink[];
  title?: string;
}

export default function CalculatorLinks({
  items,
  title = "Otras calculadoras"
}: CalculatorLinksProps) {
  return (
    <section aria-labelledby="otras-calculadoras">
      <h2
        id="otras-calculadoras"
        className="text-lg font-semibold text-foreground"
      >
        {title}
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-line bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-foreground transition-colors group-hover:text-brand">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted">
                  {item.description}
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-all group-hover:translate-x-1 group-hover:bg-brand-hover">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h12m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
