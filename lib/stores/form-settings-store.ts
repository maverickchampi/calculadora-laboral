"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants/storage";

export interface FormSettings {
  pensionFundId: string;
  commissionType: string;
  familyAllowance: string;
}

export const DEFAULT_FORM_SETTINGS: FormSettings = {
  pensionFundId: "onp",
  commissionType: "flow",
  familyAllowance: "no"
};

interface FormSettingsState extends FormSettings {
  updateSettings: (patch: Partial<FormSettings>) => void;
}

export const useFormSettingsStore = create<FormSettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_FORM_SETTINGS,
      updateSettings: (patch) => set(patch)
    }),
    {
      name: STORAGE_KEYS.form,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ pensionFundId, commissionType, familyAllowance }) => ({
        pensionFundId,
        commissionType,
        familyAllowance
      })
    }
  )
);
