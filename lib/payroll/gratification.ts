import { getFiscalYear } from "@/lib/constants/fiscal-years";

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
  referenceDate?: Date;
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
    end: new Date(year, end + 1, 0)
  };
}

function completeMonths(start: Date, end: Date): number {
  if (start > end) return 0;

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  return Math.max(0, Math.min(6, start.getDate() === 1 ? months : months - 1));
}

function parseEntryDate(value: string): Date | null {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function calculateGratifications(
  input: GratificationInput
): GratificationPeriod[] {
  const reference = input.referenceDate ?? new Date();
  const entry = parseEntryDate(input.entryDate);

  if (!entry) return [];

  const allowance = input.hasFamilyAllowance
    ? getFiscalYear(input.fiscalYear).familyAllowance
    : 0;
  const remuneration = input.monthlySalary + allowance;
  const bonusRate = BONUS_RATE[input.insuranceType];

  const firstYear = Math.min(entry.getFullYear(), reference.getFullYear()) - 1;
  const lastYear = Math.max(entry.getFullYear(), reference.getFullYear()) + 2;
  const candidates: Array<{ period: GratificationPeriod; end: Date }> = [];

  for (let year = firstYear; year <= lastYear; year++) {
    for (const type of ["julio", "diciembre"] as const) {
      const { start, end } = getPeriodBounds(year, type);

      if (end < reference) continue;

      const periodStart = entry > start ? entry : start;

      if (periodStart > end) continue;

      const months = completeMonths(periodStart, end);

      if (months <= 0) continue;

      const amount = remuneration * (months / 6);
      const bonus = amount * bonusRate;

      candidates.push({
        end,
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

  return candidates
    .sort((a, b) => a.end.getTime() - b.end.getTime())
    .slice(0, 2)
    .map((candidate) => candidate.period);
}
