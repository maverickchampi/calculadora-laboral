"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Select from "@/components/atoms/select";
import Button from "@/components/atoms/button";
import FormSection from "@/components/molecules/form-section";
import ResultPanel from "./result-panel";
import WithholdingDetail from "./withholding-detail";
import {
  additionalDeductionRules,
  baseSalaryRules,
  bonusesRules,
  SALARY_FORM_DEFAULTS,
  type SalaryFormValues
} from "./rules";
import { calculateBreakdown } from "@/lib/payroll/calculate";
import type { Breakdown, CommissionType } from "@/lib/payroll/types";
import {
  COMMISSION_TYPE_OPTIONS,
  FAMILY_ALLOWANCE_OPTIONS,
  PENSION_OPTIONS
} from "@/lib/constants/form-options";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { useFormSettingsStore } from "@/lib/stores/form-settings-store";

export default function SalaryForm() {
  const pensionFundId = useFormSettingsStore((state) => state.pensionFundId);
  const commissionType = useFormSettingsStore((state) => state.commissionType);
  const familyAllowance = useFormSettingsStore(
    (state) => state.familyAllowance
  );
  const updateSettings = useFormSettingsStore((state) => state.updateSettings);

  const [resultado, setResultado] = useState<Breakdown | null>(null);
  const isAfp = pensionFundId !== "onp";

  const { control, handleSubmit, reset } = useForm<SalaryFormValues>({
    defaultValues: SALARY_FORM_DEFAULTS
  });

  const onSubmit = (values: SalaryFormValues) => {
    setResultado(
      calculateBreakdown({
        baseSalary: Number(values.baseSalary),
        pensionFundId,
        commissionType: commissionType as CommissionType,
        year: LATEST_FISCAL_YEAR.year,
        hasFamilyAllowance: familyAllowance === "yes",
        bonuses: Number(values.bonuses) || 0,
        additionalDeduction: Number(values.additionalDeduction) || 0
      })
    );
  };

  const handleClear = () => {
    reset(SALARY_FORM_DEFAULTS);
    setResultado(null);
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-6"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection title="Datos laborales">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Controller
              name="baseSalary"
              control={control}
              rules={baseSalaryRules}
              render={({ field, fieldState }) => (
                <Input
                  id="base-salary"
                  label="Sueldo base (S/) *"
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
            <Select
              label="Sistema de pensiones"
              value={pensionFundId}
              onChange={(e) =>
                updateSettings({ pensionFundId: e.target.value })
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
                value={commissionType}
                onChange={(e) =>
                  updateSettings({ commissionType: e.target.value })
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
              value={familyAllowance}
              onChange={(e) =>
                updateSettings({ familyAllowance: e.target.value })
              }
            >
              {FAMILY_ALLOWANCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </FormSection>

        <FormSection title="Remuneración y adicionales">
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Controller
              name="bonuses"
              control={control}
              rules={bonusesRules}
              render={({ field, fieldState }) => (
                <Input
                  label="Bonos / ingresos adicionales (S/)"
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
            <Controller
              name="additionalDeduction"
              control={control}
              rules={additionalDeductionRules}
              render={({ field, fieldState }) => (
                <Input
                  id="additional-deduction"
                  label="Descuento adicional (S/)"
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
        </FormSection>

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
