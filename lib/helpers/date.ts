const PERU_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Lima",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export function getTodayInputValue(): string {
  return PERU_DATE_FORMATTER.format(new Date());
}
