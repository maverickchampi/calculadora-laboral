"use client";

import { useEffect } from "react";
import { useFormSettingsStore } from "@/lib/stores/form-settings-store";

export default function StoreHydrator() {
  useEffect(() => {
    void useFormSettingsStore.persist.rehydrate();
  }, []);

  return null;
}
