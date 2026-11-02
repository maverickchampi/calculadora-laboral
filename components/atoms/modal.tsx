"use client";

import type { ModalProps as ComponentProps } from "@maverickchampi/components";
import { Modal as Component } from "@maverickchampi/components";

export type ModalProps = ComponentProps;

export default function Modal(props: ModalProps) {
  return <Component {...props} />;
}
