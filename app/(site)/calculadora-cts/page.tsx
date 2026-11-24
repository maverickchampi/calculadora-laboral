import type { Metadata } from "next";
import CalculatorLinks from "@/components/molecules/calculator-links";
import DataTable from "@/components/molecules/data-table";
import InfoCard from "@/components/molecules/info-card";
import PageHero from "@/components/molecules/page-hero";
import { getRelatedCalculators } from "@/lib/constants/calculators";
import { buildMetadata } from "@/lib/seo/metadata";
import CtsForm from "./_components/cts-form";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de CTS en Perú",
  description:
    "Calcula gratis tu Compensación por Tiempo de Servicios (CTS) en Perú según tu remuneración y los meses trabajados.",
  path: "/calculadora-cts"
});

export default function Page() {
  return (
    <>
      <PageHero
        title="Calculadora de CTS en Perú"
        subtitle="Calcula la Compensación por Tiempo de Servicios que te corresponde según tu sueldo y tiempo trabajado."
      />

      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <CtsForm />
      </div>

      <div className="mx-auto w-full max-w-[1024px] px-4 py-10 sm:px-6 sm:py-14">
        <hr className="border-t border-line" />
      </div>

      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <CalculatorLinks items={getRelatedCalculators("/calculadora-cts")} />
      </div>

      <div className="mx-auto w-full max-w-[1024px] space-y-6 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
        <InfoCard title="¿Cómo se calcula la CTS?">
          <p className="mt-3 text-sm leading-relaxed text-muted">
            La CTS se deposita dos veces al año: en mayo (periodo noviembre a
            abril) y en noviembre (periodo mayo a octubre). El monto equivale a
            la remuneración computable por los meses completos trabajados,
            dividida entre 12.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <span className="font-medium text-foreground">
                Remuneración computable:
              </span>{" "}
              sueldo bruto + asignación familiar + 1/6 de la gratificación.
            </li>
            <li>
              <span className="font-medium text-foreground">Fórmula:</span>{" "}
              remuneración computable × (meses completos ÷ 12).
            </li>
            <li>
              <span className="font-medium text-foreground">1/6:</span> se toma
              la gratificación sin la bonificación extraordinaria. Si no la
              ingresas, se estima con el sueldo bruto.
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="Periodos de depósito">
          <DataTable
            columns={["Depósito", "Periodo trabajado"]}
            rows={[
              { id: "mayo", cells: ["Mayo", "Noviembre – Abril"] },
              { id: "noviembre", cells: ["Noviembre", "Mayo – Octubre"] }
            ]}
          />
        </InfoCard>
      </div>
    </>
  );
}
