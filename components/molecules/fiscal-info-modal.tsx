"use client";

import { useState } from "react";
import Modal from "@/components/atoms/modal";
import { getFiscalYear } from "@/lib/constants/fiscal-years";
import { getPensionRate, PENSION_FUNDS } from "@/lib/constants/pension-funds";
import { formatSoles } from "@/lib/helpers/format";

interface FiscalInfoModalProps {
  year: number | null;
}

export default function FiscalInfoModal({ year }: FiscalInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fiscalYear = year === null ? null : getFiscalYear(year);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-line bg-card px-3 text-sm font-medium text-foreground hover:border-brand hover:text-brand"
      >
        Datos fiscales
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={year === null ? "Datos fiscales" : `Datos fiscales ${year}`}
        ariaLabelClose="Cerrar"
        hasCloseButtonInDesktop
        closeInClickOut
      >
        {fiscalYear === null ? (
          <p className="text-sm text-muted">Cargando datos fiscales…</p>
        ) : (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-foreground">Año {year}</h3>
              <dl className="mt-2 space-y-2">
                <Row
                  label="Sueldo mínimo (RMV)"
                  value={formatSoles(fiscalYear.minimumWage)}
                />
                <Row
                  label="Asignación familiar"
                  value={formatSoles(fiscalYear.familyAllowance)}
                />
                <Row label="UIT" value={formatSoles(fiscalYear.uit)} />
              </dl>
            </section>

            <section>
              <h3 className="font-semibold text-foreground">
                Descuentos de pensión
              </h3>
              <ul className="mt-2 space-y-3">
                {PENSION_FUNDS.map((fund) => (
                  <li key={fund.id} className="rounded-lg bg-tint px-3 py-2">
                    <p className="font-semibold text-foreground">{fund.label}</p>
                    {fund.kind === "onp" ? (
                      <p className="mt-1 text-xs text-muted">
                        Aporte {fund.contribution.toFixed(2)}%
                      </p>
                    ) : (
                      <div className="mt-1 space-y-0.5 text-xs text-muted">
                        <p>
                          Aporte {fund.contribution.toFixed(2)}% · Prima{" "}
                          {fund.insurancePremium.toFixed(2)}%
                        </p>
                        <p>
                          Flujo {fund.flowCommission.toFixed(2)}% → total{" "}
                          {getPensionRate(fund, "flow").toFixed(2)}%
                        </p>
                        <p>
                          Mixta {fund.mixedFlowCommission.toFixed(2)}% + saldo{" "}
                          {fund.mixedBalanceCommission.toFixed(2)}% → total{" "}
                          {getPensionRate(fund, "mixed").toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <p className="text-xs text-muted">
              La comisión sobre saldo (mixta) se cobra sobre el fondo acumulado,
              no sobre el sueldo mensual.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
