import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { STORAGE_KEYS } from "@/lib/constants/storage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const TITLE =
  "Calculadora de Sueldo Neto en Perú 2026 | Calculadora Laboral";
const DESCRIPTION =
  "Calcula gratis tu sueldo neto en Perú: descuentos de AFP u ONP, retención de quinta categoría, asignación familiar y UIT 2026. Conoce cuánto recibirás al mes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Calculadora Laboral"
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "calculadora de sueldo neto",
    "sueldo neto Perú",
    "sueldo bruto a neto",
    "descuentos AFP",
    "ONP",
    "retención quinta categoría",
    "UIT 2026",
    "asignación familiar",
    "calculadora laboral"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "finance",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" }
  ],
  colorScheme: "light dark"
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEYS.theme}");
    document.documentElement.setAttribute(
      "data-theme",
      stored === "dark" ? "dark" : "light"
    );
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
