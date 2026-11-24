import type { FaqItem } from "@/components/molecules/faq-accordion";

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Cómo se calcula el sueldo neto en Perú?",
    answer:
      "El sueldo neto se obtiene restando al sueldo bruto los aportes al sistema de pensiones (ONP o AFP) y la retención del impuesto a la renta de quinta categoría. La calculadora también suma la asignación familiar y los bonos o ingresos adicionales."
  },
  {
    question: "¿Qué descuentos se aplican al sueldo bruto?",
    answer:
      "Principalmente dos: el aporte previsional (ONP 13% o AFP: 10% de aporte, prima de seguro y comisión) y la retención de quinta categoría. La asignación familiar y los bonos se suman, no se descuentan."
  },
  {
    question: "¿Qué es la asignación familiar?",
    answer:
      "Es un beneficio equivalente al 10% de la Remuneración Mínima Vital (RMV). Se otorga a los trabajadores que tengan hijos menores de 18 años (o hasta los 24 años si cursan estudios superiores)."
  },
  {
    question: "¿Cómo se calcula la retención de quinta categoría?",
    answer:
      "Se proyecta la renta anual: sueldo por 12 más las gratificaciones. A ese total se le resta 7 UIT y se aplica la escala progresiva de 8%, 14%, 17%, 20% y 30%. El impuesto anual se divide entre 12 para obtener la retención mensual."
  },
  {
    question: "¿Qué es la UIT?",
    answer:
      "La Unidad Impositiva Tributaria (UIT) es el valor de referencia en soles establecido cada año por el Estado peruano para calcular impuestos, multas, deducciones y límites legales."
  },
  {
    question: "¿La calculadora incluye gratificaciones y CTS?",
    answer:
      "Este cálculo es solo de sueldo neto. Desde los enlaces al final de la página puedes ir a las calculadoras de CTS y gratificación."
  },
  {
    question: "¿El resultado es exacto?",
    answer:
      "Es una estimación basada en los valores oficiales de UIT y RMV. El monto final puede variar según tu régimen, bonificaciones y la información registrada por tu empleador."
  }
];
