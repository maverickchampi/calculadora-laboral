import { STORAGE_KEYS } from "@/lib/constants/storage";

export interface FormSettings {
  year: number | null;
  pensionFundId: string;
  commissionType: string;
  familyAllowance: string;
}

export const DEFAULT_FORM_SETTINGS: FormSettings = {
  year: null,
  pensionFundId: "onp",
  commissionType: "flow",
  familyAllowance: "no"
};

export function loadFormSettings(): Partial<FormSettings> | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.form);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<FormSettings>;
  } catch {
    return null;
  }
}

export function saveFormSettings(settings: FormSettings): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEYS.form, JSON.stringify(settings));
  } catch {
    // localStorage puede no estar disponible (modo privado, etc.)
  }
}
