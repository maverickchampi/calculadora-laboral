"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { CALCULATORS } from "@/lib/constants/calculators";

const CALCULATOR_ICONS: Record<string, string> = {
  "/": "mc-wallet",
  "/calculadora-cts": "mc-vault",
  "/calculadora-gratificacion": "mc-gift"
};

function getCalculatorIcon(href: string) {
  return CALCULATOR_ICONS[href] ?? "mc-calculator";
}

export default function CalculatorMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Ver todas las calculadoras"
        className="h-10 gap-2 px-3 py-0 text-sm"
      >
        <i className="mc-calculator text-base" aria-hidden="true" />
        <span className="hidden sm:inline">Calculadoras</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Calculadoras laborales"
        ariaLabelClose="Cerrar"
        hasCloseButtonInDesktop
        closeInClickOut
      >
        <ul className="space-y-3">
          {CALCULATORS.map((calculator) => {
            const isActive = calculator.href === pathname;

            return (
              <li key={calculator.href}>
                <Link
                  href={calculator.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    isActive
                      ? "border-brand bg-brand-soft"
                      : "border-line bg-card hover:border-brand hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    <i
                      className={`${getCalculatorIcon(calculator.href)} text-xl`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">
                        {calculator.title}
                      </span>
                      {isActive ? (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          Actual
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted">
                      {calculator.description}
                    </span>
                  </span>
                  {!isActive ? (
                    <i
                      className="mc-chevron-right mt-3 shrink-0 text-base text-brand transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}
