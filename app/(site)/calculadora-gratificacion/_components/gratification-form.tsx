"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import FormSection from "@/components/molecules/form-section";
import GratificationResult from "./gratification-result";
import {
  entryDateRules,
  GRATIFICATION_FORM_DEFAULTS,
  monthlySalaryRules,
  type GratificationFormValues
} from "./rules";
import {
  calculateGratifications,
  type GratificationPeriod
} from "@/lib/payroll/gratification";
import { getFiscalYear } from "@/lib/constants/fiscal-years";
import { YEAR_OPTIONS } from "@/lib/constants/form-options";
import { formatSoles } from "@/lib/helpers/format";
import { useFormSettingsStore } from "@/lib/stores/form-settings-store";

export default function GratificationForm() {
  const year = useFormSettingsStore((state) => state.year);
  const updateSettings = useFormSettingsStore((state) => state.updateSettings);
  const [periods, setPeriods] = useState<GratificationPeriod[] | null>(null);

  const { control, handleSubmit, reset } = useForm<GratificationFormValues>({
    defaultValues: GRATIFICATION_FORM_DEFAULTS
  });

  const familyAllowanceAmount =
    year === null ? null : getFiscalYear(year).familyAllowance;

  const onSubmit = (values: GratificationFormValues) => {
    if (year === null) return;

    setPeriods(
      calculateGratifications({
        monthlySalary: Number(values.monthlySalary),
        hasFamilyAllowance: values.familyAllowance === "yes",
        insuranceType: values.insuranceType,
        entryDate: values.entryDate,
        fiscalYear: year
      })
    );
  };

  const handleClear = () => {
    reset(GRATIFICATION_FORM_DEFAULTS);
    setPeriods(null);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Datos para el cálculo">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Controller
              name="monthlySalary"
              control={control}
              rules={monthlySalaryRules}
              render={({ field, fieldState }) => (
                <Input
                  id="monthly-salary"
                  label="Sueldo bruto (S/) *"
                  type="number"
                  required
                  min={1}
                  step="0.01"
                  inputMode="decimal"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="entryDate"
              control={control}
              rules={entryDateRules}
              render={({ field, fieldState }) => (
                <Input
                  id="entry-date"
                  label="Fecha de ingreso *"
                  type="date"
                  required
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="familyAllowance"
              control={control}
              render={({ field }) => (
                <Select
                  label="Asignación familiar"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <option value="no">No</option>
                  <option value="yes">
                    Sí
                    {familyAllowanceAmount !== null
                      ? ` (${formatSoles(familyAllowanceAmount)})`
                      : ""}
                  </option>
                </Select>
              )}
            />
            <Controller
              name="insuranceType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Seguro de salud"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <option value="essalud">EsSalud (bono 9%)</option>
                  <option value="eps">EPS privada (bono 6.75%)</option>
                </Select>
              )}
            />
            <Select
              label="Año"
              value={year === null ? "" : String(year)}
              onChange={(e) => updateSettings({ year: Number(e.target.value) })}
            >
              {YEAR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
          <p className="mt-4 text-xs text-muted">
            El año se usa para la asignación familiar (10% de la RMV). La fecha
            de ingreso determina los meses completos de cada semestre.
          </p>
        </FormSection>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" className="sm:flex-1">
            Calcular
          </Button>
          {periods && (
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpiar
            </Button>
          )}
        </div>
      </form>

      <div aria-live="polite" aria-atomic="false">
        {periods && <GratificationResult periods={periods} />}
      </div>
    </div>
  );
}
