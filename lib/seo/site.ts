export const SITE_NAME = "Calculadora Laboral";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://calculadora-laboral-maverickchampi.vercel.app/";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_DESCRIPTION =
  "Calculadoras gratuitas para trabajadores en Perú: sueldo neto con AFP u ONP, CTS y gratificación, con los valores oficiales de UIT y RMV.";

export const SITE_LAST_UPDATED = "2026-11-24";
