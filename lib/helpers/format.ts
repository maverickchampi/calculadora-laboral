const soles = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatSoles(value: number): string {
  return soles.format(value);
}
