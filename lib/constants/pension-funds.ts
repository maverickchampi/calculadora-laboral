export type CommissionType = "flow" | "mixed";

export interface PensionFund {
  id: string;
  label: string;
  kind: "onp" | "afp";
  /** Mandatory contribution to the fund (%) */
  contribution: number;
  /** Insurance premium (%) */
  insurancePremium: number;
  /** Flow commission: % of monthly remuneration */
  flowCommission: number;
  /** Mixed commission: % of monthly remuneration */
  mixedFlowCommission: number;
  /** Mixed commission: annual % on the accumulated fund (not deducted from salary) */
  mixedBalanceCommission: number;
}

export const PENSION_FUNDS: PensionFund[] = [
  {
    id: "onp",
    label: "ONP",
    kind: "onp",
    contribution: 13,
    insurancePremium: 0,
    flowCommission: 0,
    mixedFlowCommission: 0,
    mixedBalanceCommission: 0,
  },
  {
    id: "afp-integra",
    label: "AFP Integra",
    kind: "afp",
    contribution: 10,
    insurancePremium: 1.37,
    flowCommission: 1.55,
    mixedFlowCommission: 0,
    mixedBalanceCommission: 0.78,
  },
  {
    id: "afp-prima",
    label: "AFP Prima",
    kind: "afp",
    contribution: 10,
    insurancePremium: 1.37,
    flowCommission: 1.6,
    mixedFlowCommission: 0.18,
    mixedBalanceCommission: 1.25,
  },
  {
    id: "afp-habitat",
    label: "AFP Habitat",
    kind: "afp",
    contribution: 10,
    insurancePremium: 1.37,
    flowCommission: 1.47,
    mixedFlowCommission: 0.38,
    mixedBalanceCommission: 1.25,
  },
  {
    id: "afp-profuturo",
    label: "AFP Profuturo",
    kind: "afp",
    contribution: 10,
    insurancePremium: 1.37,
    flowCommission: 1.69,
    mixedFlowCommission: 0.67,
    mixedBalanceCommission: 0.68,
  },
];

export function getPensionRate(
  fund: PensionFund,
  commissionType: CommissionType,
): number {
  if (fund.kind === "onp") return fund.contribution;

  const commission =
    commissionType === "mixed" ? fund.mixedFlowCommission : fund.flowCommission;

  return fund.contribution + fund.insurancePremium + commission;
}
