"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import FormSection from "@/components/molecules/form-section";
import CtsResult from "./cts-result";
import {
  ctsEntryDateRules,
  ctsGratificationRules,
  ctsMonthlySalaryRules,
  CTS_FORM_DEFAULTS,
  type CtsFormValues
} from "./rules";
import { calculateCts, type CtsPeriod } from "@/lib/payroll/cts";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { formatSoles } from "@/lib/helpers/format";

export default function CtsForm() {
  const [periods, setPeriods] = useState<CtsPeriod[] | null>(null);

  const { control, handleSubmit, reset } = useForm<CtsFormValues>({
    defaultValues: CTS_FORM_DEFAULTS
  });

  const familyAllowanceAmount = LATEST_FISCAL_YEAR.familyAllowance;

  const onSubmit = (values: CtsFormValues) => {
    setPeriods(
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
    reset(CTS_FORM_DEFAULTS);
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
                    Sí ({formatSoles(familyAllowanceAmount)})
                  </option>
                </Select>
              )}
            />
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
            bruto. La asignación familiar se calcula con la RMV vigente.
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
        {periods && <CtsResult periods={periods} />}
      </div>
    </div>
  );
}
