"use client";

/// <reference types="react" />

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import type { ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "plus-chip": any;
    }
  }
}

interface PlusChipProps {
  children?: ReactNode;
  kind?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  type?: "default" | "avatar";
  status?: "default" | "success" | "warning" | "danger" | "info";
  shape?: "full" | "rounded";
  invert?: boolean;
  dismiss?: boolean;
  disabled?: boolean;
  onDismiss?: (event: CustomEvent) => void;
}

export interface PlusChipRef {
  element: HTMLElement | null;
}

const PlusChip = forwardRef<PlusChipRef, PlusChipProps>(function PlusChip(
  {
    children,
    kind = "filled",
    size = "md",
    type = "default",
    status = "default",
    shape = "full",
    invert = false,
    dismiss = false,
    disabled = false,
    onDismiss,
  },
  forwardedRef
) {
  const ref = useRef<any>(null);

  useImperativeHandle(forwardedRef, () => ({
    element: ref.current,
  }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleDismiss = (e: CustomEvent) => {
      onDismiss?.(e);
    };

    el.addEventListener("dismiss", handleDismiss);

    return () => {
      el.removeEventListener("dismiss", handleDismiss);
    };
  }, [onDismiss]);

  return (
    <plus-chip
      ref={ref}
      kind={kind}
      size={size}
      type={type}
      status={status}
      shape={shape}
      invert={invert}
      dismiss={dismiss}
      disabled={disabled}
    >
      {children}
    </plus-chip>
  );
});

export default PlusChip;
