import {
  getFiscalYear,
  GRATIFICATION_BONUS_RATE,
  GRATIFICATIONS_PER_YEAR,
  INCOME_TAX_DEDUCTION_UIT,
  TAX_BRACKETS,
} from "@/lib/constants/fiscal-years";
import { getPensionRate, PENSION_FUNDS } from "@/lib/constants/pension-funds";
import type {
  Breakdown,
  CalculatorInput,
  TaxBracketResult,
  WithholdingBreakdown,
} from "./types";

export function calculateBreakdown(input: CalculatorInput): Breakdown {
  const fiscalYear = getFiscalYear(input.year);

  const familyAllowance = input.hasFamilyAllowance
    ? fiscalYear.familyAllowance
    : 0;

  const grossSalary =
    input.baseSalary + familyAllowance + input.bonuses - input.additionalDeduction;

  const fund =
    PENSION_FUNDS.find((item) => item.id === input.pensionFundId) ??
    PENSION_FUNDS[0];
  const pensionRate = getPensionRate(fund, input.commissionType);
  const pensionAmount = grossSalary * (pensionRate / 100);

  const withholding = calculateWithholding(grossSalary, fiscalYear.uit);

  const net = grossSalary - pensionAmount - withholding.monthlyWithholding;

  return {
    baseSalary: input.baseSalary,
    familyAllowance,
    bonuses: input.bonuses,
    additionalDeduction: input.additionalDeduction,
    grossSalary,
    pensionAmount,
    pensionRate,
    withholdingAmount: withholding.monthlyWithholding,
    withholding,
    net,
  };
}

/**
 * Fifth-category income:
 *  - Annual gross income = salary × 12 + (salary × 1.09) × 2
 *  - Net income = gross income − 7 UIT
 *  - Apply the progressive tax scale by brackets (in UIT for the year)
 *  - Monthly withholding = annual tax ÷ 12
 */
export function calculateWithholding(
  monthlyGross: number,
  uit: number,
): WithholdingBreakdown {
  const annualSalary = monthlyGross * 12;
  const gratificationEach = monthlyGross * (1 + GRATIFICATION_BONUS_RATE);
  const gratificationTotal = gratificationEach * GRATIFICATIONS_PER_YEAR;
  const annualGrossIncome = annualSalary + gratificationTotal;

  const uitDeduction = INCOME_TAX_DEDUCTION_UIT * uit;
  const annualNetIncome = Math.max(0, annualGrossIncome - uitDeduction);

  const brackets: TaxBracketResult[] = TAX_BRACKETS.map((bracket) => {
    const from = bracket.fromUit * uit;
    const to = bracket.toUit === null ? Infinity : bracket.toUit * uit;
    const taxableBase = Math.max(0, Math.min(annualNetIncome, to) - from);

    return {
      label: bracket.label,
      from,
      to: bracket.toUit === null ? null : to,
      rate: bracket.rate,
      taxableBase,
      tax: taxableBase * bracket.rate,
    };
  });

  const annualTax = brackets.reduce((sum, bracket) => sum + bracket.tax, 0);

  return {
    monthlyGross,
    annualSalary,
    gratificationEach,
    gratificationTotal,
    annualGrossIncome,
    uitDeduction,
    annualNetIncome,
    brackets,
    annualTax,
    monthlyWithholding: annualTax / 12,
  };
}
