import type { WithholdingBreakdown } from "@/lib/payroll/types";
import { formatSoles } from "@/lib/helpers/format";

interface WithholdingDetailProps {
  data: WithholdingBreakdown;
}

export default function WithholdingDetail({ data }: WithholdingDetailProps) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        Detalle de renta (5ta categoría)
      </h2>

      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Sueldo bruto mensual" value={formatSoles(data.monthlyGross)} />
        <Row label="× 12 meses" value={formatSoles(data.annualSalary)} />
        <Row
          label="Gratificaciones (sueldo × 1.09 × 2)"
          value={formatSoles(data.gratificationTotal)}
        />
        <div className="border-t border-line pt-2">
          <Row
            label="Renta bruta anual"
            value={formatSoles(data.annualGrossIncome)}
            strong
          />
        </div>
        <Row
          label="- 7 UIT"
          value={`-${formatSoles(data.uitDeduction)}`}
        />
        <Row
          label="Renta neta anual"
          value={formatSoles(data.annualNetIncome)}
          strong
        />
      </dl>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Escala progresiva
        </h3>
        <div className="mt-2 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-xs">
            <thead className="bg-tint text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">
                  Tramo
                </th>
                <th scope="col" className="px-2 py-2 text-right font-medium">
                  Tasa
                </th>
                <th scope="col" className="px-2 py-2 text-right font-medium">
                  Base
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Impuesto
                </th>
              </tr>
            </thead>
            <tbody>
              {data.brackets.map((bracket) => (
                <tr key={bracket.label} className="border-t border-line">
                  <td className="px-3 py-2">
                    <div className="text-foreground">{bracket.label}</div>
                    <div className="text-[11px] text-muted">
                      {formatSoles(bracket.from)} –{" "}
                      {bracket.to === null
                        ? "a más"
                        : formatSoles(bracket.to)}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-right text-muted">
                    {(bracket.rate * 100).toFixed(0)}%
                  </td>
                  <td className="px-2 py-2 text-right text-muted">
                    {formatSoles(bracket.taxableBase)}
                  </td>
                  <td className="px-3 py-2 text-right text-foreground">
                    {formatSoles(bracket.tax)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dl className="mt-6 space-y-2 text-sm">
        <Row label="Impuesto anual" value={formatSoles(data.annualTax)} strong />
        <div className="border-t border-line pt-2">
          <Row
            label="÷ 12 meses (retención mensual)"
            value={formatSoles(data.monthlyWithholding)}
            strong
          />
        </div>
      </dl>
    </section>
  );
}

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={strong ? "font-semibold text-foreground" : "text-foreground"}>
        {value}
      </dd>
    </div>
  );
}
