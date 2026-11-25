"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import FormSection from "@/components/molecules/form-section";
import CtsResult from "./cts-result";
import {
  CTS_FORM_DEFAULTS,
  ctsEntryDateRules,
  ctsGratificationRules,
  ctsMonthlySalaryRules,
  getCtsFormDefaults,
  type CtsFormValues
} from "./rules";
import { calculateCts, type CtsCalculation } from "@/lib/payroll/cts";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { getTodayInputValue } from "@/lib/helpers/date";
import { useScrollToResult } from "@/lib/hooks/use-scroll-to-result";

export default function CtsForm() {
  const [result, setResult] = useState<CtsCalculation | null>(null);
  const resultRef = useScrollToResult(result);

  const { control, handleSubmit, reset } = useForm<CtsFormValues>({
    defaultValues: CTS_FORM_DEFAULTS
  });

  useEffect(() => {
    reset(getCtsFormDefaults());
  }, [reset]);

  const onSubmit = (values: CtsFormValues) => {
    setResult(
      calculateCts({
        monthlySalary: Number(values.monthlySalary),
        hasFamilyAllowance: values.familyAllowance === "yes",
        fiscalYear: LATEST_FISCAL_YEAR.year,
        entryDate: values.entryDate,
        gratification:
          values.gratification === "" ? null : Number(values.gratification)
      })
    );
  };

  const handleClear = () => {
    reset(getCtsFormDefaults());
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Datos para el cálculo">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Controller
              name="monthlySalary"
              control={control}
              rules={ctsMonthlySalaryRules}
              render={({ field, fieldState }) => (
                <Input
                  id="cts-monthly-salary"
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
              rules={ctsEntryDateRules}
              render={({ field, fieldState }) => (
                <Input
                  id="cts-entry-date"
                  label="Fecha de ingreso"
                  type="date"
                  required
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={(event) => {
                    field.onBlur();
                    if (!event.target.value) {
                      field.onChange(getTodayInputValue());
                    }
                  }}
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
                  <option value="yes">Sí</option>
                </Select>
              )}
            />
          </div>
        </FormSection>

        <FormSection title="Gratificación (opcional)">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Controller
              name="gratification"
              control={control}
              rules={ctsGratificationRules}
              render={({ field, fieldState }) => (
                <Input
                  id="cts-gratification"
                  label="Gratificación percibida (S/)"
                  type="number"
                  min={0}
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
          </div>
          <p className="mt-4 text-xs text-muted">
            Si no ingresas la gratificación, estimamos el 1/6 con el sueldo
            bruto.
          </p>
        </FormSection>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" className="sm:flex-1">
            Calcular
          </Button>
          {result && (
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpiar
            </Button>
          )}
        </div>
      </form>

      <div
        ref={resultRef}
        aria-live="polite"
        aria-atomic="false"
        className="scroll-mt-6"
      >
        {result && (
          <CtsResult
            periods={result.periods}
            skippedLabel={result.skippedLabel}
          />
        )}
      </div>
    </div>
  );
}
