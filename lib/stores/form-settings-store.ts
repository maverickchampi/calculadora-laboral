"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultYear } from "@/lib/constants/fiscal-years";
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

interface FormSettingsState extends FormSettings {
  setYear: (year: number) => void;
  updateSettings: (patch: Partial<FormSettings>) => void;
}

export const useFormSettingsStore = create<FormSettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_FORM_SETTINGS,
      setYear: (year) => set({ year }),
      updateSettings: (patch) => set(patch)
    }),
    {
      name: STORAGE_KEYS.form,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ year, pensionFundId, commissionType, familyAllowance }) => ({
        year,
        pensionFundId,
        commissionType,
        familyAllowance
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.year === null) {
          state.setYear(getDefaultYear(new Date().getFullYear()));
        }
      }
    }
  )
);
