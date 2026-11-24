/** Interpreta yyyy-mm-dd como fecha local (evita el desfase UTC). */
export function parseLocalDate(value: string): Date | null {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Devuelve la fecha normalizada a medianoche local. */
export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * Meses calendario completos entre dos fechas. Un mes cuenta solo si se
 * trabajó desde el día 1; así septiembre (desde el 15) no es un mes completo.
 */
export function completeMonths(start: Date, end: Date, max = 6): number {
  if (start > end) return 0;

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  return Math.max(0, Math.min(max, start.getDate() === 1 ? months : months - 1));
}
