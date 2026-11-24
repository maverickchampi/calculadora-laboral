import type { ReactNode } from "react";
import SiteFooter from "@/components/organisms/site-footer";
import SiteHeader from "@/components/organisms/site-header";
import StoreHydrator from "@/components/providers/store-hydrator";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <StoreHydrator />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-brand"
      >
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="main" className="flex-1 w-full">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
