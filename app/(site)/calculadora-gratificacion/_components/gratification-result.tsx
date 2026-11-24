import { formatSoles } from "@/lib/helpers/format";
import type { GratificationPeriod } from "@/lib/payroll/gratification";

interface GratificationResultProps {
  periods: GratificationPeriod[];
}

export default function GratificationResult({
  periods
}: GratificationResultProps) {
  if (periods.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-tint px-5 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">
          Tu gratificación estimada
        </h2>
      </div>
      <div className="divide-y divide-line">
        {periods.map((period, index) => (
          <article key={`${period.type}-${period.year}`} className="p-5 sm:p-8">
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
              <Row
                label="Remuneración computable"
                value={formatSoles(period.remuneration)}
              />
              <Row
                label={`Gratificación (${period.months}/6)`}
                value={formatSoles(period.amount)}
              />
              <Row
                label={`Bonificación Ley 30334 (${formatRate(period.bonusRate)})`}
                value={formatSoles(period.bonus)}
              />
              <div className="flex items-center justify-between gap-4 border-t border-line pt-2">
                <dt className="font-medium text-foreground">Total a recibir</dt>
                <dd className="text-base font-semibold text-foreground">
                  {formatSoles(period.total)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="px-5 pb-5 text-xs text-muted sm:px-6 sm:pb-6">
        No incluye el descuento de renta de quinta categoría. Las
        gratificaciones no están afectas a aportes de ONP ni AFP.
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

function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(2).replace(/\.?0+$/, "")}%`;
}
