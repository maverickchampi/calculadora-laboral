import { FAQ_ITEMS } from "@/lib/constants/faq";
import { SITE_NAME, SITE_URL } from "./site";

export function buildJsonLd() {
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
          priceCurrency: "PEN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
