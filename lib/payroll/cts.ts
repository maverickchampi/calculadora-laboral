import { getFiscalYear } from "@/lib/constants/fiscal-years";
import { completeMonths, parseLocalDate, startOfDay } from "./periods";

export type CtsType = "mayo" | "noviembre";

export interface CtsPeriod {
  type: CtsType;
  year: number;
  label: string;
  months: number;
  salary: number;
  familyAllowance: number;
  sixth: number;
  remuneration: number;
  amount: number;
}

export interface CtsInput {
  monthlySalary: number;
  hasFamilyAllowance: boolean;
  fiscalYear: number;
  entryDate: string; // yyyy-mm-dd
  gratification?: number | null;
}

export interface CtsCalculation {
  periods: CtsPeriod[];
  skippedLabel: string | null;
}

function getPeriod(year: number, type: CtsType) {
  if (type === "mayo") {
    return {
      start: new Date(year - 1, 10, 1),
      end: new Date(year, 3, 30),
      deposit: new Date(year, 4, 15)
    };
  }

  return {
    start: new Date(year, 4, 1),
    end: new Date(year, 9, 31),
    deposit: new Date(year, 10, 15)
  };
}

export function calculateCts(input: CtsInput): CtsCalculation {
  const today = startOfDay(new Date());
  const entry = parseLocalDate(input.entryDate);

  if (!entry) return { periods: [], skippedLabel: null };

  const reference = entry > today ? entry : today;

  const allowance = input.hasFamilyAllowance
    ? getFiscalYear(input.fiscalYear).familyAllowance
    : 0;
  const sixth =
    (input.gratification && input.gratification > 0
      ? input.gratification
      : input.monthlySalary) / 6;
  const remuneration = input.monthlySalary + allowance + sixth;

  const firstYear = Math.min(entry.getFullYear(), today.getFullYear()) - 1;
  const lastYear = Math.max(entry.getFullYear(), today.getFullYear()) + 2;
  const deposits: Array<{ deposit: Date; period: CtsPeriod }> = [];

  for (let year = firstYear; year <= lastYear; year++) {
    for (const type of ["mayo", "noviembre"] as const) {
      const { start, end, deposit } = getPeriod(year, type);
      const periodStart = entry > start ? entry : start;
      const months = completeMonths(periodStart, end);

      deposits.push({
        deposit,
        period: {
          type,
          year,
          label: `${type === "mayo" ? "Mayo" : "Noviembre"} ${year}`,
          months,
          salary: input.monthlySalary,
          familyAllowance: allowance,
          sixth,
          remuneration,
          amount: remuneration * (months / 12)
        }
      });
    }
  }

  deposits.sort((a, b) => a.deposit.getTime() - b.deposit.getTime());

  const firstAfterEntry = deposits.find((item) => item.deposit >= entry);

  const skippedLabel =
    firstAfterEntry && firstAfterEntry.period.months === 0
      ? firstAfterEntry.period.label
      : null;

  return {
    periods: deposits
      .filter(
        (item) => item.deposit >= reference && item.period.months > 0
      )
      .slice(0, 2)
      .map((item) => item.period),
    skippedLabel
  };
}
