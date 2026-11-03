"use client";

import { useSyncExternalStore } from "react";
import Button from "./button";
import { STORAGE_KEYS } from "@/lib/constants/storage";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEYS.theme, next);
  };

  return (
    <Button
      variant="outline"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      className="h-10 w-10 p-0"
    >
      <i className="mc-moon theme-icon-moon" aria-hidden="true" />
      <i className="mc-sun theme-icon-sun" aria-hidden="true" />
    </Button>
  );
}
