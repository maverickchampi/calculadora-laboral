"use client";

import { useState, type ReactNode } from "react";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import ResultPanel from "./result-panel";
import WithholdingDetail from "./withholding-detail";
import { calculateBreakdown } from "@/lib/payroll/calculate";
import type { Breakdown, CommissionType } from "@/lib/payroll/types";
import {
  COMMISSION_TYPE_OPTIONS,
  FAMILY_ALLOWANCE_OPTIONS,
  PENSION_OPTIONS,
  YEAR_OPTIONS
} from "@/lib/constants/form-options";
import { useFormSettings } from "@/components/providers/form-settings-provider";

interface FormState {
  baseSalary: string;
  bonuses: string;
  additionalDeduction: string;
}

const INITIAL_STATE: FormState = {
  baseSalary: "",
  bonuses: "",
  additionalDeduction: ""
};

export default function SalaryForm() {
  const { settings, updateSettings: onSettingsChange } = useFormSettings();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [resultado, setResultado] = useState<Breakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deductionError, setDeductionError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isAfp = settings.pensionFundId !== "onp";

  const handleCalculate = () => {
    if (settings.year === null) return;

    const baseSalary = Number(form.baseSalary) || 0;
    const additionalDeduction = Number(form.additionalDeduction) || 0;

    if (baseSalary < 1) {
      setError("Ingresa un sueldo base de al menos S/ 1.");
      setDeductionError(null);
      setResultado(null);
      document.getElementById("base-salary")?.focus();
      return;
    }

    if (additionalDeduction > baseSalary) {
      setError(null);
      setDeductionError(
        "El descuento adicional no puede ser mayor al sueldo base."
      );
      setResultado(null);
      document.getElementById("additional-deduction")?.focus();
      return;
    }

    setError(null);
    setDeductionError(null);
    setResultado(
      calculateBreakdown({
        baseSalary,
        pensionFundId: settings.pensionFundId,
        commissionType: settings.commissionType as CommissionType,
        year: settings.year,
        hasFamilyAllowance: settings.familyAllowance === "yes",
        bonuses: Number(form.bonuses) || 0,
        additionalDeduction
      })
    );
  };

  const handleClear = () => {
    setForm(INITIAL_STATE);
    setResultado(null);
    setError(null);
    setDeductionError(null);
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
              min={1}
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
              value={settings.year === null ? "" : String(settings.year)}
              onChange={(e) => onSettingsChange({ year: Number(e.target.value) })}
            >
              {YEAR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            <Select
              label="Sistema de pensiones"
              value={settings.pensionFundId}
              onChange={(e) =>
                onSettingsChange({ pensionFundId: e.target.value })
              }
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
                value={settings.commissionType}
                onChange={(e) =>
                  onSettingsChange({ commissionType: e.target.value })
                }
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
              value={settings.familyAllowance}
              onChange={(e) =>
                onSettingsChange({ familyAllowance: e.target.value })
              }
            >
              {FAMILY_ALLOWANCE_OPTIONS.map((o) => (
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
              id="additional-deduction"
              label="Descuento adicional (S/)"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={form.additionalDeduction}
              onChange={(e) => {
                set("additionalDeduction", e.target.value);
                if (deductionError) setDeductionError(null);
              }}
              error={deductionError ?? undefined}
            />
          </div>
        </Section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" className="sm:flex-1">
            Calcular
          </Button>
          {resultado && (
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpiar
            </Button>
          )}
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
      <div className="border-b border-line bg-tint px-5 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </section>
  );
}
