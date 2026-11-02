"use client";

import { useState } from "react";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";
import { getFiscalYear } from "@/lib/constants/fiscal-years";
import { formatSoles } from "@/lib/helpers/format";

interface FiscalInfoModalProps {
  year: number | null;
}

export default function FiscalInfoModal({ year }: FiscalInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fiscalYear = year === null ? null : getFiscalYear(year);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="h-10 px-3 py-0 text-sm"
      >
        Datos fiscales
      </Button>

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
          <dl className="space-y-2 text-sm">
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
