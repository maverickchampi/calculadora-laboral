"use client";

import type { SelectProps as ComponentProps } from "@maverickchampi/components";
import { Select as Component } from "@maverickchampi/components";

export type SelectProps = ComponentProps;

export default function Select({ className = "", ...props }: SelectProps) {
  return <Component className={`styles_w-full ${className}`.trim()} {...props} />;
}
