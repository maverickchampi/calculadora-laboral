import type { RegisterOptions } from "react-hook-form";
import { getTodayInputValue } from "@/lib/helpers/date";

export interface CtsFormValues {
  monthlySalary: string;
  familyAllowance: "yes" | "no";
  entryDate: string;
  gratification: string;
}

export const CTS_FORM_DEFAULTS: CtsFormValues = {
  monthlySalary: "",
  familyAllowance: "no",
  entryDate: "",
  gratification: ""
};

export function getCtsFormDefaults(): CtsFormValues {
  return {
    ...CTS_FORM_DEFAULTS,
    entryDate: getTodayInputValue()
  };
}

export const ctsMonthlySalaryRules: RegisterOptions<
  CtsFormValues,
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

export const ctsEntryDateRules: RegisterOptions<CtsFormValues, "entryDate"> = {
  required: "Ingresa tu fecha de ingreso.",
  validate: (value) => {
    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return "Ingresa una fecha válida.";
    }

    return true;
  }
};

export const ctsGratificationRules: RegisterOptions<
  CtsFormValues,
  "gratification"
> = {
  validate: (value) => {
    if (value === "") return true;

    const amount = Number(value);

    if (!Number.isFinite(amount) || amount < 0) {
      return "Ingresa un monto válido.";
    }

    return true;
  }
};
