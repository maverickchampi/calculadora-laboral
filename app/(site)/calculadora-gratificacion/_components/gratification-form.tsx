"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import FormSection from "@/components/molecules/form-section";
import GratificationResult from "./gratification-result";
import {
  GRATIFICATION_FORM_DEFAULTS,
  entryDateRules,
  getGratificationFormDefaults,
  monthlySalaryRules,
  type GratificationFormValues
} from "./rules";
import {
  calculateGratifications,
  type GratificationCalculation
} from "@/lib/payroll/gratification";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { getTodayInputValue } from "@/lib/helpers/date";
import { useScrollToResult } from "@/lib/hooks/use-scroll-to-result";

export default function GratificationForm() {
  const [result, setResult] = useState<GratificationCalculation | null>(null);
  const resultRef = useScrollToResult(result);

  const { control, handleSubmit, reset } = useForm<GratificationFormValues>({
    defaultValues: GRATIFICATION_FORM_DEFAULTS
  });

  useEffect(() => {
    reset(getGratificationFormDefaults());
  }, [reset]);

  const familyAllowanceAmount = LATEST_FISCAL_YEAR.familyAllowance;

  const onSubmit = (values: GratificationFormValues) => {
    setResult(
      calculateGratifications({
        monthlySalary: Number(values.monthlySalary),
        hasFamilyAllowance: values.familyAllowance === "yes",
        insuranceType: values.insuranceType,
        entryDate: values.entryDate,
        fiscalYear: LATEST_FISCAL_YEAR.year
      })
    );
  };

  const handleClear = () => {
    reset(getGratificationFormDefaults());
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
                  <option value="essalud">EsSalud</option>
                  <option value="eps">EPS</option>
                </Select>
              )}
            />
          </div>
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
          <GratificationResult
            periods={result.periods}
            skippedLabel={result.skippedLabel}
          />
        )}
      </div>
    </div>
  );
}
