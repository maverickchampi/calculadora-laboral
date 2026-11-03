import { SUPPORTED_YEARS } from "./fiscal-years";
import { PENSION_FUNDS } from "./pension-funds";

export const PENSION_OPTIONS = PENSION_FUNDS.map((fund) => ({
  value: fund.id,
  label: fund.label
}));

export const COMMISSION_TYPE_OPTIONS = [
  { value: "flow", label: "Comisión por flujo" },
  { value: "mixed", label: "Comisión mixta" }
] as const;

export const FAMILY_ALLOWANCE_OPTIONS = [
  { value: "no", label: "No aplica" },
  { value: "yes", label: "Sí" }
] as const;

export const YEAR_OPTIONS = SUPPORTED_YEARS.map((fiscalYear) => ({
  value: String(fiscalYear.year),
  label: String(fiscalYear.year)
}));
