import type { Metadata } from "next";
import DataTable from "@/components/molecules/data-table";
import FaqAccordion from "@/components/molecules/faq-accordion";
import InfoCard from "@/components/molecules/info-card";
import PageHero from "@/components/molecules/page-hero";
import { LATEST_FISCAL_YEAR } from "@/lib/constants/fiscal-years";
import { getPensionRate, PENSION_FUNDS } from "@/lib/constants/pension-funds";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildJsonLd } from "@/lib/seo/json-ld";
import SalaryForm from "./_components/salary-form";
import { FAQ_ITEMS } from "./faqs";

export const metadata: Metadata = buildMetadata({
  title: `Calculadora de sueldo neto en Perú ${LATEST_FISCAL_YEAR.year}`,
  description: `Calcula gratis tu sueldo neto en Perú: descuentos de AFP u ONP, retención de quinta categoría, asignación familiar y UIT ${LATEST_FISCAL_YEAR.year}. Conoce cuánto recibirás al mes.`,
  path: "/"
});

export default function Page() {
  const jsonLd = buildJsonLd(FAQ_ITEMS);

  const pensionRows = PENSION_FUNDS.map((fund) => ({
    id: fund.id,
    cells: [
      fund.label,
      fund.kind === "onp"
        ? `${fund.contribution.toFixed(2)}%`
        : `${getPensionRate(fund, "flow").toFixed(2)}%`,
      fund.kind === "onp" ? "—" : `${getPensionRate(fund, "mixed").toFixed(2)}%`
    ]
  }));

  return (
    <>
      <PageHero
        title="Calculadora de sueldo neto en Perú"
        subtitle="Ingresa tus datos laborales y obtén una estimación del sueldo neto a recibir en Perú."
      />

      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <SalaryForm />
      </div>

      <div className="mx-auto w-full max-w-[1024px] px-4 py-8 sm:px-6 sm:py-10">
        <hr className="border-t border-line" />
      </div>

      <div className="mx-auto w-full max-w-[1024px] space-y-6 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        <InfoCard title="¿Cómo se calcula el sueldo neto en Perú?">
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
              sueldo base + asignación familiar + bonos - descuentos
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
              renta anual proyectada - 7 UIT, con escala progresiva y dividida
              entre 12.
            </li>
            <li>
              <span className="font-medium text-foreground">Sueldo neto:</span>{" "}
              remuneración bruta - pensión - retención.
            </li>
          </ol>
        </InfoCard>

        <InfoCard title="Descuentos de pensión">
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Si empezaste a trabajar desde 2013 en adelante, tienes por defecto la
            comisión mixta, ya que la comisión por flujo era la forma antigua de
            antes de ese año. Si aportabas desde antes y no sabes si mantuviste
            el esquema anterior o pasaste al nuevo, mejor confírmalo directo con
            tu AFP.
          </p>
          <DataTable
            columns={["Sistema", "Comisión por flujo", "Comisión mixta"]}
            rows={pensionRows}
          />
        </InfoCard>

        <InfoCard title="Preguntas frecuentes">
          <FaqAccordion items={FAQ_ITEMS} />
        </InfoCard>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
