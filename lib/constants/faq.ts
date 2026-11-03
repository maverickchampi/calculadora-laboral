export interface FaqItem {
  question: string;
  answer: string;
}

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
    question: "¿Cuánto se descuenta por ONP y AFP en 2026?",
    answer:
      "La ONP descuenta 13% de la remuneración. En las AFP el descuento incluye 10% de aporte obligatorio, 1.37% de prima de seguro y la comisión de la administradora (por flujo o mixta), que varía según la AFP."
  },
  {
    question: "¿Qué es la asignación familiar y cuánto es en 2026?",
    answer:
      "Es un beneficio equivalente al 10% de la Remuneración Mínima Vital (RMV). En 2026 la RMV es S/ 1,230, por lo que la asignación familiar es S/ 123 mensuales."
  },
  {
    question: "¿Cómo se calcula la retención de quinta categoría?",
    answer:
      "Se proyecta la renta anual: sueldo por 12 más las gratificaciones. A ese total se le resta 7 UIT y se aplica la escala progresiva de 8%, 14%, 17%, 20% y 30%. El impuesto anual se divide entre 12 para obtener la retención mensual."
  },
  {
    question: "¿Cuál es la UIT 2026 y para qué sirve?",
    answer:
      "La UIT 2026 es S/ 5,500. Se usa como referencia para la deducción de 7 UIT y para los tramos de la renta de quinta categoría."
  },
  {
    question: "¿La calculadora incluye gratificaciones y CTS?",
    answer:
      "Por el momento no, pero en las próximas versiones se está considerando."
  },
  {
    question: "¿El resultado es exacto?",
    answer:
      "Es una estimación basada en los valores oficiales de UIT y RMV. El monto final puede variar según tu régimen, bonificaciones y la información registrada por tu empleador."
  }
];
