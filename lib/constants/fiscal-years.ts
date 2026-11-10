export interface FiscalYear {
  year: number;
  uit: number;
  minimumWage: number;
  /** 10% RMV */
  familyAllowance: number;
}

export const FISCAL_YEARS: Record<number, FiscalYear> = {
  2025: { year: 2025, uit: 5350, minimumWage: 1130, familyAllowance: 113 },
  2026: { year: 2026, uit: 5500, minimumWage: 1230, familyAllowance: 123 }
};

export const SUPPORTED_YEARS = Object.values(FISCAL_YEARS).sort(
  (a, b) => a.year - b.year
);

export function getFiscalYear(year: number): FiscalYear {
  return FISCAL_YEARS[year] ?? FISCAL_YEARS[2026];
}

export function getDefaultYear(currentYear: number): number {
  if (FISCAL_YEARS[currentYear]) return currentYear;

  return SUPPORTED_YEARS.reduce((closest, fiscalYear) =>
    Math.abs(fiscalYear.year - currentYear) <
    Math.abs(closest.year - currentYear)
      ? fiscalYear
      : closest,
  SUPPORTED_YEARS[0]).year;
}

export const INCOME_TAX_DEDUCTION_UIT = 7;

export const GRATIFICATIONS_PER_YEAR = 2;
export interface TaxBracket {
  fromUit: number;
  toUit: number | null; // null = no limit
  rate: number;
  label: string;
}

export const TAX_BRACKETS: TaxBracket[] = [
  { fromUit: 0, toUit: 5, rate: 0.08, label: "Hasta 5 UIT" },
  { fromUit: 5, toUit: 20, rate: 0.14, label: "Más de 5 a 20 UIT" },
  { fromUit: 20, toUit: 35, rate: 0.17, label: "Más de 20 a 35 UIT" },
  { fromUit: 35, toUit: 45, rate: 0.2, label: "Más de 35 a 45 UIT" },
  { fromUit: 45, toUit: null, rate: 0.3, label: "Más de 45 UIT" }
];
