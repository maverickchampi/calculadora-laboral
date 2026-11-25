import { getFiscalYear } from "@/lib/constants/fiscal-years";
import { completeMonths, parseLocalDate, startOfDay } from "./periods";

export type InsuranceType = "essalud" | "eps";
export type GratificationType = "julio" | "diciembre";

export interface GratificationPeriod {
  type: GratificationType;
  year: number;
  label: string;
  months: number;
  remuneration: number;
  amount: number;
  bonusRate: number;
  bonus: number;
  total: number;
}

export interface GratificationInput {
  monthlySalary: number;
  hasFamilyAllowance: boolean;
  insuranceType: InsuranceType;
  entryDate: string; // yyyy-mm-dd
  fiscalYear: number;
}

export interface GratificationCalculation {
  periods: GratificationPeriod[];
  skippedLabel: string | null;
}

const BONUS_RATE: Record<InsuranceType, number> = {
  essalud: 0.09,
  eps: 0.0675
};

const PERIOD_MONTHS: Record<GratificationType, { start: number; end: number }> =
  {
    julio: { start: 0, end: 5 },
    diciembre: { start: 6, end: 11 }
  };

function getPeriodBounds(year: number, type: GratificationType) {
  const { start, end } = PERIOD_MONTHS[type];

  return {
    start: new Date(year, start, 1),
    end: new Date(year, end + 1, 0),
    deposit: new Date(year, type === "julio" ? 6 : 11, 15)
  };
}

export function calculateGratifications(
  input: GratificationInput
): GratificationCalculation {
  const today = startOfDay(new Date());
  const entry = parseLocalDate(input.entryDate);

  if (!entry) return { periods: [], skippedLabel: null };

  const reference = entry > today ? entry : today;

  const allowance = input.hasFamilyAllowance
    ? getFiscalYear(input.fiscalYear).familyAllowance
    : 0;
  const remuneration = input.monthlySalary + allowance;
  const bonusRate = BONUS_RATE[input.insuranceType];

  const firstYear = Math.min(entry.getFullYear(), today.getFullYear()) - 1;
  const lastYear = Math.max(entry.getFullYear(), today.getFullYear()) + 2;
  const deposits: Array<{ deposit: Date; period: GratificationPeriod }> = [];

  for (let year = firstYear; year <= lastYear; year++) {
    for (const type of ["julio", "diciembre"] as const) {
      const { start, end, deposit } = getPeriodBounds(year, type);
      const periodStart = entry > start ? entry : start;
      const months = completeMonths(periodStart, end);
      const amount = remuneration * (months / 6);
      const bonus = amount * bonusRate;

      deposits.push({
        deposit,
        period: {
          type,
          year,
          label: `${type === "julio" ? "Julio" : "Diciembre"} ${year}`,
          months,
          remuneration,
          amount,
          bonusRate,
          bonus,
          total: amount + bonus
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
