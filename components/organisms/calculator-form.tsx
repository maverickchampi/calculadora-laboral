"use client";

import { useState, type ReactNode } from "react";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import ResultPanel from "@/components/molecules/result-panel";
import WithholdingDetail from "@/components/molecules/withholding-detail";
import { calculateBreakdown } from "@/lib/payroll/calculate";
import type { Breakdown, CommissionType } from "@/lib/payroll/types";
import {
  COMMISSION_TYPE_OPTIONS,
  PENSION_OPTIONS,
  YEAR_OPTIONS,
  familyAllowanceOptions,
} from "@/lib/constants/form-options";

interface CalculatorFormProps {
  year: number | null;
  onYearChange: (year: number) => void;
}

interface FormState {
  baseSalary: string;
  pensionFundId: string;
  commissionType: string;
  familyAllowance: string;
  bonuses: string;
  additionalDeduction: string;
}

const INITIAL_STATE: FormState = {
  baseSalary: "",
  pensionFundId: "onp",
  commissionType: "flow",
  familyAllowance: "no",
  bonuses: "",
  additionalDeduction: "",
};

export default function CalculatorForm({
  year,
  onYearChange,
}: CalculatorFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [resultado, setResultado] = useState<Breakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isAfp = form.pensionFundId !== "onp";
  const allowanceOptions = familyAllowanceOptions(year);

  const handleCalculate = () => {
    if (year === null) return;

    const baseSalary = Number(form.baseSalary) || 0;
    if (baseSalary <= 0) {
      setError("Ingresa tu sueldo base para calcular.");
      setResultado(null);
      document.getElementById("base-salary")?.focus();
      return;
    }

    setError(null);
    setResultado(
      calculateBreakdown({
        baseSalary,
        pensionFundId: form.pensionFundId,
        commissionType: form.commissionType as CommissionType,
        year,
        hasFamilyAllowance: form.familyAllowance === "yes",
        bonuses: Number(form.bonuses) || 0,
        additionalDeduction: Number(form.additionalDeduction) || 0,
      }),
    );
  };

  const handleClear = () => {
    setForm(INITIAL_STATE);
    setResultado(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <Section title="Datos laborales">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Input
              id="base-salary"
              label="Sueldo base (S/) *"
              type="number"
              required
              min={0}
              step="0.01"
              inputMode="decimal"
              value={form.baseSalary}
              onChange={(e) => {
                set("baseSalary", e.target.value);
                if (error) setError(null);
              }}
              error={error ?? undefined}
            />
            <Select
              label="Año"
              value={year === null ? "" : String(year)}
              onChange={(e) => onYearChange(Number(e.target.value))}
            >
              {YEAR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            <Select
              label="Sistema de pensiones"
              value={form.pensionFundId}
              onChange={(e) => set("pensionFundId", e.target.value)}
            >
              {PENSION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            {isAfp && (
              <Select
                label="Tipo de comisión"
                value={form.commissionType}
                onChange={(e) => set("commissionType", e.target.value)}
              >
                {COMMISSION_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            )}
            <Select
              label="Asignación familiar"
              value={form.familyAllowance}
              onChange={(e) => set("familyAllowance", e.target.value)}
            >
              {allowanceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </Section>

        <Section title="Remuneración y adicionales">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Input
              label="Bonos / ingresos adicionales (S/)"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={form.bonuses}
              onChange={(e) => set("bonuses", e.target.value)}
            />
            <Input
              label="Descuento adicional (S/)"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={form.additionalDeduction}
              onChange={(e) => set("additionalDeduction", e.target.value)}
            />
          </div>
        </Section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" className="sm:flex-1">
            Calcular
          </Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpiar
          </Button>
        </div>
      </form>

      <div aria-live="polite" aria-atomic="false" className="space-y-6">
        {resultado && (
          <>
            <ResultPanel data={resultado} />
            <WithholdingDetail data={resultado.withholding} />
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-tint px-6 py-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}
