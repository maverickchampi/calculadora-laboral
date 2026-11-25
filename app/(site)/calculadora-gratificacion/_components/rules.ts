import type { RegisterOptions } from "react-hook-form";
import type { InsuranceType } from "@/lib/payroll/gratification";
import { getTodayInputValue } from "@/lib/helpers/date";

export interface GratificationFormValues {
  monthlySalary: string;
  familyAllowance: "yes" | "no";
  insuranceType: InsuranceType;
  entryDate: string;
}

export const GRATIFICATION_FORM_DEFAULTS: GratificationFormValues = {
  monthlySalary: "",
  familyAllowance: "no",
  insuranceType: "essalud",
  entryDate: ""
};

export function getGratificationFormDefaults(): GratificationFormValues {
  return {
    ...GRATIFICATION_FORM_DEFAULTS,
    entryDate: getTodayInputValue()
  };
}

export const monthlySalaryRules: RegisterOptions<
  GratificationFormValues,
  "monthlySalary"
> = {
  validate: (value) => {
    const amount = Number(value);

    if (!value || !Number.isFinite(amount) || amount < 1) {
      return "Ingresa un sueldo bruto de al menos S/ 1.";
    }

    return true;
  }
};

export const entryDateRules: RegisterOptions<
  GratificationFormValues,
  "entryDate"
> = {
  required: "Ingresa tu fecha de ingreso.",
};
