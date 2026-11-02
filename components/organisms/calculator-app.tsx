"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import ThemeToggle from "@/components/atoms/theme-toggle";
import FiscalInfoModal from "@/components/molecules/fiscal-info-modal";
import CalculatorForm from "./calculator-form";
import { getDefaultYear } from "@/lib/constants/fiscal-years";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CalculatorApp() {
  const [year, setYear] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    setYear(getDefaultYear(new Date().getFullYear()));
  }, []);

  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
              CL
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold leading-tight text-foreground">
                Calculadora Laboral
              </p>
              <p className="hidden text-xs text-muted sm:block">
                Sueldo neto en Perú{year ? ` · ${year}` : ""}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <FiscalInfoModal year={year} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1024px] px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Calculadora de sueldo neto en Perú
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ingresa tus datos laborales y obtén una estimación del sueldo neto a
            recibir en Perú.
          </p>
        </div>
        <CalculatorForm year={year} onYearChange={(value) => setYear(value)} />
      </div>
    </>
  );
}
