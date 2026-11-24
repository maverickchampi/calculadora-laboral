import type { Metadata } from "next";
import CalculatorLinks from "@/components/molecules/calculator-links";
import PageHero from "@/components/molecules/page-hero";
import { getRelatedCalculators } from "@/lib/constants/calculators";

export const metadata: Metadata = {
  title: "Calculadora de gratificación en Perú",
  description:
    "Calcula tu gratificación de julio o diciembre en Perú de forma gratuita.",
  alternates: {
    canonical: "/calculadora-gratificacion"
  }
};

export default function Page() {
  return (
    <>
      <PageHero title="Calculadora de gratificación en Perú" />
      <div className="mx-auto w-full max-w-[1024px] px-4 pb-12 sm:px-6 sm:pb-16">
        <CalculatorLinks
          items={getRelatedCalculators("/calculadora-gratificacion")}
        />
      </div>
    </>
  );
}
