import type { Breakdown } from "@/lib/payroll/types";
import { formatSoles } from "@/lib/helpers/format";

interface ResultPanelProps {
  data: Breakdown;
}

export default function ResultPanel({ data }: ResultPanelProps) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        Resultado
      </h2>

      <div className="mt-4 rounded-xl bg-brand-soft px-5 py-4">
        <p className="text-sm text-muted">Sueldo neto a recibir</p>
        <p className="mt-1 text-3xl font-bold text-brand">{formatSoles(data.net)}</p>
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <Row label="Sueldo base" value={data.baseSalary} />
        <Row label="Asignación familiar" value={data.familyAllowance} />
        <Row label="Bonos / adicionales" value={data.bonuses} />
        <Row label="Descuento adicional" value={-data.additionalDeduction} />

        <div className="space-y-3 border-t border-line pt-3">
          <Row label="Remuneración bruta" value={data.grossSalary} strong />
          <Row
            label={`Pensión (${data.pensionRate.toFixed(2)}%)`}
            value={-data.pensionAmount}
          />
          <Row label="Retención (5ta categoría)" value={-data.withholdingAmount} />
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
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={strong ? "font-semibold text-foreground" : "text-foreground"}>
        {formatSoles(value)}
      </dd>
    </div>
  );
}
