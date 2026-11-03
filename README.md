# Calculadora Laboral

A **net salary calculator for Peru** that turns a gross monthly salary into the amount you actually take home — including pension contributions (ONP / AFP) and fifth-category income tax.

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> UI in Spanish · Code and documentation in English.

---

## Features

- **Gross → net salary** calculation with a clear breakdown.
- **Pension systems**: ONP (13%) and the four AFPs, with **flow** and **mixed** commission schemes.
- **Fifth-category income tax** (renta de quinta) projected annually and split into a monthly withholding.
- **Fiscal year selector** (2025 / 2026) with UIT, RMV and family allowance driven by a single config object.
- **Dark / light mode** persisted in `localStorage`, with no flash on load.
- **Accessible by design**: skip link, landmarks, labeled fields, `aria-live` results, accessible validation and focus management.
- **SEO-ready**: metadata, canonical, Open Graph / Twitter images, `robots.txt`, `sitemap.xml`, web manifest and JSON-LD.
- Built on the [`@maverickchampi/components`](https://www.npmjs.com/package/@maverickchampi/components) design system.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Components | `@maverickchampi/components` |
| Fonts | `next/font` (Geist) |

---

## Getting started

### Prerequisites

- **Node.js 20.9+** (24 recommended)
- **npm**

### Installation

```bash
git clone <your-repo-url>
cd calculadora-laboral
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## Project structure

```
app/
├── layout.tsx            # Root layout, metadata, theme bootstrap
├── page.tsx              # Page shell + JSON-LD
├── globals.css           # Tailwind entry + layers
├── icon.svg              # Favicon ("CL")
├── robots.ts             # /robots.txt
├── sitemap.ts            # /sitemap.xml
├── manifest.ts           # /manifest.webmanifest
├── opengraph-image.tsx   # Dynamic OG image
└── twitter-image.tsx     # Dynamic Twitter image

components/
├── atoms/                # Button, Input, Select, Modal, ThemeToggle…
├── molecules/            # ResultPanel, WithholdingDetail, FiscalInfoModal
└── organisms/            # CalculatorApp, CalculatorForm, SeoContent, SiteFooter

lib/
├── constants/
│   ├── fiscal-years.ts   # UIT / RMV / family allowance per year
│   ├── pension-funds.ts  # ONP + AFP rates and commissions
│   ├── form-options.ts   # Select options
│   └── faq.ts            # FAQ content (used by UI + JSON-LD)
├── helpers/format.ts     # Currency formatting (es-PE)
├── payroll/              # Pure calculation logic + types
├── seo/                  # Site config + JSON-LD
└── og/render.tsx         # Shared social image layout

styles/
└── theme.css             # Color tokens + component theme mapping
```

---

## How the calculation works

```
Gross salary = base salary + family allowance + bonuses - additional deductions
Pension      = ONP 13%  |  AFP (10% + 1.37% insurance + commission)
Net salary   = gross - pension - monthly income tax
```

### Fifth-category income tax

```
Annual gross    = gross × 12 + (gross × 1.09) × 2   # two gratificaciones
Annual net      = annual gross - 7 UIT
Annual tax      = progressive brackets applied to annual net
Monthly tax     = annual tax ÷ 12
```

Progressive brackets (expressed in UIT, so they adapt to the selected year):

| Bracket | UIT range | Rate |
| --- | --- | --- |
| 1 | up to 5 UIT | 8% |
| 2 | 5 – 20 UIT | 14% |
| 3 | 20 – 35 UIT | 17% |
| 4 | 35 – 45 UIT | 20% |
| 5 | above 45 UIT | 30% |

### Adding a new fiscal year

Edit `lib/constants/fiscal-years.ts`:

```ts
export const FISCAL_YEARS: Record<number, FiscalYear> = {
  2026: { year: 2026, uit: 5500, minimumWage: 1230, familyAllowance: 123 },
  // add your year here
};
```

The selector, the calculator and the fiscal modal pick it up automatically.

---

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`) and a skip link.
- Every field has an associated `<label>`.
- Validation errors use `role="alert"` + `aria-invalid` and move focus to the field.
- Results are announced through an `aria-live` region.
- Icon-only buttons have accessible names and `aria-pressed` / `aria-expanded` state.
- Visible focus rings, `scope="col"` on tables and a chevron affordance for the FAQ.

---

## SEO

- Metadata with `metadataBase`, canonical, keywords and robots directives.
- Dynamic **Open Graph** and **Twitter** images via `next/og`.
- `robots.txt`, `sitemap.xml` and a web manifest.
- JSON-LD: `WebApplication` + `FAQPage`.
- Long-form content (how it works, fiscal data, FAQ) rendered on the server.

---

## Theming

Colors live in `styles/theme.css` as CSS variables and are mapped to Tailwind tokens in `app/globals.css`. The library theme is controlled through `--mc-color-*` variables, and dark mode is driven by the `data-theme` attribute on `<html>`.

---


## 📄 License

[MIT](LICENSE) © 2026 Maverick Champi
