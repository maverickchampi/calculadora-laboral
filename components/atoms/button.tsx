"use client";

import type { ButtonProps as ComponentProps } from "@maverickchampi/components";
import { Button as Component } from "@maverickchampi/components";

export type ButtonProps = ComponentProps;

export default function Button(props: ButtonProps) {
  return <Component {...props} />;
}
