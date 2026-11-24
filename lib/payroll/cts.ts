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

function isUpcoming(deposit: Date, reference: Date): boolean {
  if (deposit.getFullYear() !== reference.getFullYear()) {
    return deposit.getFullYear() > reference.getFullYear();
  }

  return deposit.getMonth() >= reference.getMonth();
}

export function calculateCts(input: CtsInput): CtsPeriod[] {
  const reference = startOfDay(new Date());
  const entry = parseLocalDate(input.entryDate);

  if (!entry) return [];

  const allowance = input.hasFamilyAllowance
    ? getFiscalYear(input.fiscalYear).familyAllowance
    : 0;
  const sixth =
    (input.gratification && input.gratification > 0
      ? input.gratification
      : input.monthlySalary) / 6;
  const remuneration = input.monthlySalary + allowance + sixth;

  const firstYear = Math.min(entry.getFullYear(), reference.getFullYear()) - 1;
  const lastYear = Math.max(entry.getFullYear(), reference.getFullYear()) + 2;
  const candidates: Array<{ period: CtsPeriod; deposit: Date }> = [];

  for (let year = firstYear; year <= lastYear; year++) {
    for (const type of ["mayo", "noviembre"] as const) {
      const { start, end, deposit } = getPeriod(year, type);

      if (!isUpcoming(deposit, reference)) continue;

      const periodStart = entry > start ? entry : start;

      if (periodStart > end) continue;

      const months = completeMonths(periodStart, end);

      if (months <= 0) continue;

      candidates.push({
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

  return candidates
    .sort((a, b) => a.deposit.getTime() - b.deposit.getTime())
    .slice(0, 2)
    .map((candidate) => candidate.period);
}
