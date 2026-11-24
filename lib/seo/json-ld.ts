import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export function buildJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        inLanguage: "es-PE"
      },
      {
        "@type": "ItemList",
        name: "Calculadoras laborales en Perú",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Calculadora de sueldo neto",
            url: `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculadora de CTS",
            url: `${SITE_URL}/calculadora-cts`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Calculadora de gratificación",
            url: `${SITE_URL}/calculadora-gratificacion`
          }
        ]
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
