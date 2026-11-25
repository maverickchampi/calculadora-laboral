export interface CalculatorLink {
  href: string;
  title: string;
  description: string;
}

export const CALCULATORS: CalculatorLink[] = [
  {
    href: "/",
    title: "Sueldo neto",
    description:
      "Calcula tu sueldo neto con descuentos de AFP u ONP y renta de quinta."
  },
  {
    href: "/calculadora-cts",
    title: "CTS",
    description:
      "Calcula tu Compensación por Tiempo de Servicios según tu remuneración."
  },
  {
    href: "/calculadora-gratificacion",
    title: "Gratificación",
    description:
      "Calcula tu gratificación de julio o diciembre, incluida la bonificación."
  }
];
