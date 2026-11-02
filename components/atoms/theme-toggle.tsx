"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo claro y oscuro"
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line bg-card text-foreground hover:border-brand hover:text-brand"
    >
      <i className="mc-moon theme-icon-moon" aria-hidden="true" />
      <i className="mc-sun theme-icon-sun" aria-hidden="true" />
    </button>
  );
}
