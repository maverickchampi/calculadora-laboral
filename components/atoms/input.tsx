"use client";

import type { InputProps as ComponentProps } from "@maverickchampi/components";
import { Input as Component } from "@maverickchampi/components";

export type InputProps = ComponentProps;

export default function Input({ className = "", ...props }: InputProps) {
  return <Component className={`styles_w-full ${className}`.trim()} {...props} />;
}
