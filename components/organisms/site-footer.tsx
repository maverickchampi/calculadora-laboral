"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CALCULATORS } from "@/lib/constants/calculators";

export default function SiteFooter() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto w-full max-w-[1024px] px-4 py-5 sm:px-6 sm:py-6">
        <nav
          aria-label="Otras calculadoras"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs"
        >
          {CALCULATORS.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="text-muted underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {calculator.title}
            </Link>
          ))}
        </nav>
        <p className="mt-3 text-center text-xs text-muted">
          Fuente: SUNAT y SBS{year ? ` · Actualizado ${year}` : ""} · Calculadora
          Laboral
        </p>
      </div>
    </footer>
  );
}
