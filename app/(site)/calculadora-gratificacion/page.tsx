import type { Metadata } from "next";
import CalculatorLinks from "@/components/molecules/calculator-links";
import DataTable from "@/components/molecules/data-table";
import InfoCard from "@/components/molecules/info-card";
import PageHero from "@/components/molecules/page-hero";
import { getRelatedCalculators } from "@/lib/constants/calculators";
import { buildMetadata } from "@/lib/seo/metadata";
import GratificationForm from "./_components/gratification-form";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de gratificación en Perú",
  description:
    "Calcula gratis tu gratificación de julio o diciembre en Perú, incluida la bonificación extraordinaria del 9%.",
  path: "/calculadora-gratificacion"
});

export default function Page() {
  return (
    <>
      <PageHero
        title="Calculadora de gratificación en Perú"
        subtitle="Calcula tu gratificación de julio o diciembre y la bonificación extraordinaria que corresponde."
      />

      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <GratificationForm />
      </div>

      <div className="mx-auto w-full max-w-[1024px] px-4 py-10 sm:px-6 sm:py-14">
        <hr className="border-t border-line" />
      </div>

      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <CalculatorLinks
          items={getRelatedCalculators("/calculadora-gratificacion")}
        />
      </div>

      <div className="mx-auto w-full max-w-[1024px] space-y-6 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
        <InfoCard title="¿Cómo se calcula la gratificación?">
          <p className="mt-3 text-sm leading-relaxed text-muted">
            La gratificación se calcula por semestre: enero a junio se paga en
            julio y julio a diciembre se paga en diciembre. Si trabajaste el
            semestre completo recibes una remuneración mensual; si no, la parte
            proporcional a los meses completos trabajados.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <span className="font-medium text-foreground">
                Remuneración computable:
              </span>{" "}
              sueldo bruto + asignación familiar.
            </li>
            <li>
              <span className="font-medium text-foreground">Proporcional:</span>{" "}
              remuneración computable × (meses completos ÷ 6).
            </li>
            <li>
              <span className="font-medium text-foreground">
                Bonificación extraordinaria:
              </span>{" "}
              9% si estás en EsSalud o 6.75% si estás en una EPS (Ley 30334).
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="Bonificación extraordinaria (Ley 30334)">
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Es un monto adicional a la gratificación, equivalente al aporte que
            el empleador habría pagado a tu seguro de salud.
          </p>
          <DataTable
            columns={["Seguro de salud", "Bonificación"]}
            rows={[
              { id: "essalud", cells: ["EsSalud", "9%"] },
              { id: "eps", cells: ["EPS privada", "6.75%"] }
            ]}
          />
        </InfoCard>
      </div>
    </>
  );
}
