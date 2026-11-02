import { FAQ_ITEMS } from "@/lib/constants/faq";
import { SUPPORTED_YEARS } from "@/lib/constants/fiscal-years";
import { getPensionRate, PENSION_FUNDS } from "@/lib/constants/pension-funds";
import { formatSoles } from "@/lib/helpers/format";

export default function SeoContent() {
  return (
    <div className="mx-auto w-full max-w-[1024px] px-6 pb-16">
      <div className="space-y-6">
        <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">
            ¿Cómo se calcula el sueldo neto en Perú?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            El sueldo neto es el monto que recibes después de descontar los
            aportes al sistema de pensiones y la retención del impuesto a la
            renta. La calculadora parte del sueldo bruto, suma la asignación
            familiar y los bonos, y resta los descuentos de ley.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>
              <span className="font-medium text-foreground">
                Remuneración bruta:
              </span>{" "}
              sueldo base + asignación familiar + bonos − descuentos
              adicionales.
            </li>
            <li>
              <span className="font-medium text-foreground">Pensión:</span> ONP
              (13%) o AFP (10% de aporte + prima de seguro + comisión).
            </li>
            <li>
              <span className="font-medium text-foreground">
                Retención de quinta categoría:
              </span>{" "}
              renta anual proyectada − 7 UIT, con escala progresiva y dividida
              entre 12.
            </li>
            <li>
              <span className="font-medium text-foreground">Sueldo neto:</span>{" "}
              remuneración bruta − pensión − retención.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">
            Datos fiscales
          </h2>
          <p className="mt-2 text-sm text-muted">
            Valores oficiales usados por la calculadora según el año
            seleccionado.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-tint text-muted">
                <tr>
                  <th className="px-3 py-2 font-medium">Año</th>
                  <th className="px-3 py-2 font-medium">UIT</th>
                  <th className="px-3 py-2 font-medium">RMV</th>
                  <th className="px-3 py-2 font-medium">Asignación familiar</th>
                </tr>
              </thead>
              <tbody>
                {SUPPORTED_YEARS.map((fiscalYear) => (
                  <tr key={fiscalYear.year} className="border-t border-line">
                    <td className="px-3 py-2 text-foreground">
                      {fiscalYear.year}
                    </td>
                    <td className="px-3 py-2 text-muted">
                      {formatSoles(fiscalYear.uit)}
                    </td>
                    <td className="px-3 py-2 text-muted">
                      {formatSoles(fiscalYear.minimumWage)}
                    </td>
                    <td className="px-3 py-2 text-muted">
                      {formatSoles(fiscalYear.familyAllowance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-sm font-semibold text-foreground">
            Descuentos de pensión
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-tint text-muted">
                <tr>
                  <th className="px-3 py-2 font-medium">Sistema</th>
                  <th className="px-3 py-2 font-medium">Comisión por flujo</th>
                  <th className="px-3 py-2 font-medium">Comisión mixta</th>
                </tr>
              </thead>
              <tbody>
                {PENSION_FUNDS.map((fund) => (
                  <tr key={fund.id} className="border-t border-line">
                    <td className="px-3 py-2 text-foreground">{fund.label}</td>
                    <td className="px-3 py-2 text-muted">
                      {fund.kind === "onp"
                        ? `${fund.contribution.toFixed(2)}%`
                        : `${getPensionRate(fund, "flow").toFixed(2)}%`}
                    </td>
                    <td className="px-3 py-2 text-muted">
                      {fund.kind === "onp"
                        ? "—"
                        : `${getPensionRate(fund, "mixed").toFixed(2)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 divide-y divide-line">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-muted">
          Fuente: SUNAT y SBS · Actualizado 2026 · Calculadora Laboral
        </footer>
      </div>
    </div>
  );
}
