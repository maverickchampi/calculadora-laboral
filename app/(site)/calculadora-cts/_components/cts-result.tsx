import { formatSoles } from "@/lib/helpers/format";
import type { CtsPeriod } from "@/lib/payroll/cts";

interface CtsResultProps {
  periods: CtsPeriod[];
  skippedLabel?: string | null;
}

export default function CtsResult({
  periods,
  skippedLabel
}: CtsResultProps) {
  if (periods.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-tint px-5 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">
          Tu CTS estimada
        </h2>
      </div>
      {skippedLabel ? (
        <p className="border-b border-line bg-tint px-5 py-3 text-xs leading-relaxed text-muted sm:px-6">
          No te corresponde el depósito de{" "}
          <strong className="font-semibold text-foreground">
            {skippedLabel}
          </strong>{" "}
          porque no completaste ningún mes del periodo. Tu próximo depósito es{" "}
          <strong className="font-semibold text-foreground">
            {periods[0].label}
          </strong>
          .
        </p>
      ) : null}
      <div className="divide-y divide-line">
        {periods.map((period, index) => (
          <article
            key={`${period.type}-${period.year}`}
            className="p-5 sm:p-8"
          >
            <header className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {period.label}
                </h3>
                {index === 0 ? (
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                    Próxima
                  </span>
                ) : null}
              </div>
              <span className="text-xs text-muted">
                {period.months} de 6 meses
              </span>
            </header>

            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Sueldo bruto" value={formatSoles(period.salary)} />
              {period.familyAllowance > 0 ? (
                <Row
                  label="Asignación familiar"
                  value={formatSoles(period.familyAllowance)}
                />
              ) : null}
              <Row
                label="1/6 de gratificación"
                value={formatSoles(period.sixth)}
              />
              <Row
                label="Remuneración computable"
                value={formatSoles(period.remuneration)}
              />
              <div className="flex items-center justify-between gap-4 border-t border-line pt-2">
                <dt className="font-medium text-foreground">
                  CTS del periodo
                </dt>
                <dd className="text-base font-semibold text-foreground">
                  {formatSoles(period.amount)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="px-5 pb-5 text-xs text-muted sm:px-6 sm:pb-6">
        Estimación con meses completos trabajados. El depósito real puede variar
        si tu empleador incluye otros conceptos remunerativos.
      </p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
