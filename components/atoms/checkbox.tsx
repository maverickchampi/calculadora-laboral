"use client";

import type { CheckboxProps as ComponentProps } from "@maverickchampi/components";
import { Checkbox as Component } from "@maverickchampi/components";

export type CheckboxProps = ComponentProps;

export default function Checkbox(props: CheckboxProps) {
  return <Component {...props} />;
}
