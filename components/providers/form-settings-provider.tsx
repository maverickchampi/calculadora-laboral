"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode
} from "react";
import { FISCAL_YEARS, getDefaultYear } from "@/lib/constants/fiscal-years";
import {
  DEFAULT_FORM_SETTINGS,
  loadFormSettings,
  saveFormSettings,
  type FormSettings
} from "@/lib/storage/form-settings";

interface FormSettingsContextValue {
  settings: FormSettings;
  updateSettings: (patch: Partial<FormSettings>) => void;
}

const FormSettingsContext = createContext<FormSettingsContextValue | null>(null);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function FormSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<FormSettings>(DEFAULT_FORM_SETTINGS);

  useIsomorphicLayoutEffect(() => {
    const now = new Date().getFullYear();
    const stored = loadFormSettings();

    setSettings({
      year:
        typeof stored?.year === "number" && FISCAL_YEARS[stored.year]
          ? stored.year
          : getDefaultYear(now),
      pensionFundId:
        stored?.pensionFundId ?? DEFAULT_FORM_SETTINGS.pensionFundId,
      commissionType:
        stored?.commissionType ?? DEFAULT_FORM_SETTINGS.commissionType,
      familyAllowance:
        stored?.familyAllowance ?? DEFAULT_FORM_SETTINGS.familyAllowance
    });
  }, []);

  const updateSettings = (patch: Partial<FormSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveFormSettings(next);
      return next;
    });
  };

  return (
    <FormSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </FormSettingsContext.Provider>
  );
}

export function useFormSettings(): FormSettingsContextValue {
  const context = useContext(FormSettingsContext);

  if (!context) {
    throw new Error("useFormSettings debe usarse dentro de FormSettingsProvider");
  }

  return context;
}
