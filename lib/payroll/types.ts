import type { CommissionType } from "@/lib/constants/pension-funds";

export type { CommissionType };

export interface CalculatorInput {
  baseSalary: number;
  pensionFundId: string;
  commissionType: CommissionType;
  year: number;
  hasFamilyAllowance: boolean;
  bonuses: number;
  additionalDeduction: number;
}

export interface TaxBracketResult {
  label: string;
  from: number;
  to: number | null;
  rate: number;
  taxableBase: number;
  tax: number;
}

export interface WithholdingBreakdown {
  monthlyGross: number;
  annualSalary: number;
  gratificationEach: number;
  gratificationTotal: number;
  annualGrossIncome: number;
  uitDeduction: number;
  annualNetIncome: number;
  brackets: TaxBracketResult[];
  annualTax: number;
  monthlyWithholding: number;
}

export interface Breakdown {
  baseSalary: number;
  familyAllowance: number;
  bonuses: number;
  additionalDeduction: number;
  grossSalary: number;
  pensionAmount: number;
  pensionRate: number;
  withholdingAmount: number;
  withholding: WithholdingBreakdown;
  net: number;
}
