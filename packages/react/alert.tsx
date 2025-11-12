"use client";

/// <reference types="react" />

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import type { ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "plus-alert": any;
    }
  }
}

interface PlusAlertProps {
  children?: ReactNode;
  message?: ReactNode;
  description?: ReactNode;
  prefix?: ReactNode;
  dismissButton?: ReactNode;
  kind?: "filled" | "outlined" | "dashed";
  size?: "sm" | "md" | "lg";
  status?: "default" | "success" | "warning" | "danger" | "info";
  invert?: boolean;
  dismissible?: boolean;
  fullWidth?: boolean;
  statusIcon?: string;
  dismissIcon?: string;
  onDismiss?: (event: CustomEvent) => void;
}

export interface PlusAlertRef {
  element: HTMLElement | null;
}

const PlusAlert = forwardRef<PlusAlertRef, PlusAlertProps>(function PlusAlert(
  {
    children,
    message,
    description,
    prefix,
    dismissButton,
    kind = "filled",
    size = "md",
    status = "default",
    invert = false,
    dismissible = true,
    fullWidth = false,
    statusIcon,
    dismissIcon,
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

    el.addEventListener("plus-dismiss", handleDismiss);

    return () => {
      el.removeEventListener("plus-dismiss", handleDismiss);
    };
  }, [onDismiss]);

  return (
    <plus-alert
      ref={ref}
      kind={kind}
      size={size}
      status={status}
      invert={invert}
      dismissible={dismissible}
      full-width={fullWidth}
      status-icon={statusIcon}
      dismiss-icon={dismissIcon}
    >
      {prefix && <div slot="prefix">{prefix}</div>}
      {message && <div slot="message">{message}</div>}
      {description && <div slot="description">{description}</div>}
      {dismissButton && <div slot="dismiss">{dismissButton}</div>}
      {children}
    </plus-alert>
  );
});

export default PlusAlert;
