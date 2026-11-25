"use client";

import Link from "next/link";
import ThemeToggle from "@/components/atoms/theme-toggle";
import CalculatorMenu from "@/components/molecules/calculator-menu";
import FiscalInfoModal from "@/components/molecules/fiscal-info-modal";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          aria-label="Calculadora Laboral, ir al inicio"
          className="flex min-w-0 items-center gap-3"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white"
            aria-hidden="true"
          >
            CL
          </span>
          <span className="min-w-0">
            <span className="hidden truncate text-base font-semibold leading-tight text-foreground sm:block">
              Calculadora Laboral
            </span>
            <span className="hidden text-xs text-muted sm:block">
              Calculadoras laborales en Perú
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <CalculatorMenu />
          <FiscalInfoModal />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
