"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import ThemeToggle from "@/components/atoms/theme-toggle";
import FiscalInfoModal from "@/components/molecules/fiscal-info-modal";
import CalculatorForm from "./calculator-form";
import { getDefaultYear } from "@/lib/constants/fiscal-years";

// En el cliente usa useLayoutEffect (antes del paint); en el servidor
// cae a useEffect para evitar el warning de SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CalculatorApp() {
  // Arranca vacío; el año real se pinta antes del primer paint del cliente.
  const [year, setYear] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    setYear(getDefaultYear(new Date().getFullYear()));
  }, []);

  return (
    <main className="flex flex-1 w-full flex-col">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
              CL
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold leading-tight text-foreground">
                Calculadora Laboral
              </h1>
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

      <div className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="my-auto w-full max-w-[1024px]">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Calcula tu sueldo neto
            </h2>
            <p className="mt-2 text-sm text-muted">
              Ingresa tus datos laborales y obtén una estimación del sueldo neto
              a recibir en Perú.
            </p>
          </div>
          <CalculatorForm
            year={year}
            onYearChange={(value) => setYear(value)}
          />
        </div>
      </div>
    </main>
  );
}
