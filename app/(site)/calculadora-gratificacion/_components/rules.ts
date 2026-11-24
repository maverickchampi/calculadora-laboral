import type { RegisterOptions } from "react-hook-form";
import type { InsuranceType } from "@/lib/payroll/gratification";

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
  validate: (value) => {
    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return "Ingresa una fecha válida.";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      return "La fecha de ingreso no puede ser futura.";
    }

    return true;
  }
};
