"use client";

import { useState } from "react";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { formatSoles } from "@/lib/helpers/format";

export default function FiscalInfoModal() {
  const [isOpen, setIsOpen] = useState(false);

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
        title={`Datos fiscales ${LATEST_FISCAL_YEAR.year}`}
        ariaLabelClose="Cerrar"
        hasCloseButtonInDesktop
        closeInClickOut
      >
        <dl className="space-y-2 text-sm">
          <Row
            label="Sueldo mínimo (RMV)"
            value={formatSoles(LATEST_FISCAL_YEAR.minimumWage)}
          />
          <Row
            label="Asignación familiar"
            value={formatSoles(LATEST_FISCAL_YEAR.familyAllowance)}
          />
          <Row label="UIT" value={formatSoles(LATEST_FISCAL_YEAR.uit)} />
        </dl>
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
