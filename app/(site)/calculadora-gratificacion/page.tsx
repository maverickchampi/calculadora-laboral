import type { Metadata } from "next";
import CalculatorLinks from "@/components/molecules/calculator-links";
import PageHero from "@/components/molecules/page-hero";
import { getRelatedCalculators } from "@/lib/constants/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

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
      <div className="mx-auto w-full max-w-[1024px] px-4 pb-12 sm:px-6 sm:pb-16">
        <CalculatorLinks
          items={getRelatedCalculators("/calculadora-gratificacion")}
        />
      </div>
    </>
  );
}
