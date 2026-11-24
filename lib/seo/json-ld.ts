import { SITE_NAME, SITE_URL } from "./site";

export function buildJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "es-PE",
        description:
          "Calculadora gratuita de sueldo neto en Perú: descuentos de AFP u ONP, retención de quinta categoría y asignación familiar.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "PEN"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
}
