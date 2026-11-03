"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import ThemeToggle from "@/components/atoms/theme-toggle";
import FiscalInfoModal from "@/components/molecules/fiscal-info-modal";
import CalculatorForm from "./calculator-form";
import SiteFooter from "./site-footer";
import { FISCAL_YEARS, getDefaultYear } from "@/lib/constants/fiscal-years";
import {
  DEFAULT_FORM_SETTINGS,
  loadFormSettings,
  saveFormSettings,
  type FormSettings,
} from "@/lib/storage/form-settings";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface CalculatorAppProps {
  children: ReactNode;
}

export default function CalculatorApp({ children }: CalculatorAppProps) {
  const [settings, setSettings] = useState<FormSettings>(DEFAULT_FORM_SETTINGS);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const now = new Date().getFullYear();
    const stored = loadFormSettings();

    setCurrentYear(now);
    setSettings({
      year:
        typeof stored?.year === "number" && FISCAL_YEARS[stored.year]
          ? stored.year
          : getDefaultYear(now),
      pensionFundId:
        stored?.pensionFundId ?? DEFAULT_FORM_SETTINGS.pensionFundId,
      commissionType:
        stored?.commissionType ?? DEFAULT_FORM_SETTINGS.commissionType,
      familyAllowance:
        stored?.familyAllowance ?? DEFAULT_FORM_SETTINGS.familyAllowance,
    });
  }, []);

  const updateSettings = (patch: Partial<FormSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveFormSettings(next);
      return next;
    });
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-brand"
      >
        Saltar al contenido
      </a>

      <header className="border-b border-line bg-card">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white"
              aria-hidden="true"
            >
              CL
            </span>
            <div className="min-w-0">
              <p className="hidden truncate text-base font-semibold leading-tight text-foreground sm:block">
                Calculadora Laboral
              </p>
              <p className="hidden text-xs text-muted sm:block">
                Sueldo neto en Perú{settings.year ? ` · ${settings.year}` : ""}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <FiscalInfoModal year={settings.year} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1024px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Calculadora de sueldo neto en Perú
            </h1>
            <p className="mt-2 text-sm text-muted">
              Ingresa tus datos laborales y obtén una estimación del sueldo neto
              a recibir en Perú.
            </p>
          </div>
          <CalculatorForm
            settings={settings}
            onSettingsChange={updateSettings}
          />
        </div>
        {children}
      </main>

      <SiteFooter year={currentYear} />
    </>
  );
}
