import CalculatorApp from "@/components/organisms/calculator-app";
import SeoContent from "@/components/organisms/seo-content";
import { buildJsonLd } from "@/lib/seo/json-ld";

export default function Page() {
  const jsonLd = buildJsonLd();

  return (
    <main className="flex flex-1 w-full flex-col">
      <CalculatorApp />
      <SeoContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
