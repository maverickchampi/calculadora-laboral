import { ImageResponse } from "next/og";
import { renderSocialImage } from "@/lib/og/render";

export const alt =
  "Calculadoras laborales en Perú: sueldo neto, CTS y gratificación";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(renderSocialImage(), { ...size });
}
