import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { STORAGE_KEYS } from "@/lib/constants/storage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const TITLE = `${SITE_NAME}: sueldo neto, CTS y gratificación`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "calculadora laboral",
    "calculadora de sueldo neto",
    "sueldo neto Perú",
    "sueldo bruto a neto",
    "descuentos AFP",
    "ONP",
    "retención quinta categoría",
    "UIT 2026",
    "asignación familiar",
    "calculadora de CTS",
    "CTS Perú",
    "compensación por tiempo de servicios",
    "calculadora de gratificación",
    "gratificación julio diciembre Perú"
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
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION
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
