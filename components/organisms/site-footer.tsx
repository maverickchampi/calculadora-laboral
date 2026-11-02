interface SiteFooterProps {
  year: number | null;
}

export default function SiteFooter({ year }: SiteFooterProps) {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto w-full max-w-[1024px] px-6 py-6 text-center text-xs text-muted">
        Fuente: SUNAT y SBS{year ? ` · Actualizado ${year}` : ""} · Calculadora
        Laboral
      </div>
    </footer>
  );
}
