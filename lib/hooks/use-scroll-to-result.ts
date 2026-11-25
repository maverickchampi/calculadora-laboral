"use client";

import { useEffect, useRef } from "react";

export function useScrollToResult<T>(result: T | null) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) return;


    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  return ref;
}
