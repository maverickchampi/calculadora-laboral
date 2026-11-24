import type { Metadata } from "next";
import CalculatorLinks from "@/components/molecules/calculator-links";
import PageHero from "@/components/molecules/page-hero";
import { getRelatedCalculators } from "@/lib/constants/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

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
      <div className="mx-auto w-full max-w-[1024px] px-4 pb-12 sm:px-6 sm:pb-16">
        <CalculatorLinks items={getRelatedCalculators("/calculadora-cts")} />
      </div>
    </>
  );
}
