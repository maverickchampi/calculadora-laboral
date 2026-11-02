import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calculadora Laboral",
    short_name: "Calc. Laboral",
    description:
      "Calcula gratis tu sueldo neto en Perú: AFP u ONP, retención de quinta categoría y asignación familiar.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d91023",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
