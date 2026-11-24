import type { RegisterOptions } from "react-hook-form";

export interface SalaryFormValues {
  baseSalary: string;
  bonuses: string;
  additionalDeduction: string;
}

export const SALARY_FORM_DEFAULTS: SalaryFormValues = {
  baseSalary: "",
  bonuses: "",
  additionalDeduction: ""
};

function toAmount(value: string): number | null {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : null;
}

export const baseSalaryRules: RegisterOptions<
  SalaryFormValues,
  "baseSalary"
> = {
  validate: (value) => {
    const amount = toAmount(value);

    if (amount === null || amount < 1) {
      return "Ingresa un sueldo base de al menos S/ 1.";
    }

    return true;
  }
};

export const bonusesRules: RegisterOptions<SalaryFormValues, "bonuses"> = {
  validate: (value) => {
    if (value === "") return true;

    const amount = toAmount(value);

    if (amount === null || amount < 0) {
      return "Los bonos no pueden ser negativos.";
    }

    return true;
  }
};

export const additionalDeductionRules: RegisterOptions<
  SalaryFormValues,
  "additionalDeduction"
> = {
  validate: (value, formValues) => {
    if (value === "") return true;

    const amount = toAmount(value);

    if (amount === null || amount < 0) {
      return "El descuento no puede ser negativo.";
    }

    const baseSalary = toAmount(formValues.baseSalary) ?? 0;

    if (amount > baseSalary) {
      return "El descuento adicional no puede ser mayor al sueldo base.";
    }

    return true;
  }
};
