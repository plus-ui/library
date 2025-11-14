"use client";

/// <reference types="react" />

import { useRef, useImperativeHandle, forwardRef } from "react";
import type { ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "plus-divider": any;
    }
  }
}

export type PlusDividerOrientation = "horizontal" | "vertical";
export type PlusDividerKind = "solid" | "dashed" | "dotted";
export type PlusDividerThickness = "thin" | "medium" | "thick";
export type PlusDividerContentPosition = "left" | "center" | "right";

interface PlusDividerProps {
  children?: ReactNode;
  orientation?: PlusDividerOrientation;
  kind?: PlusDividerKind;
  thickness?: PlusDividerThickness;
  contentPosition?: PlusDividerContentPosition;
}

export interface PlusDividerRef {
  element: HTMLElement | null;
}

const PlusDivider = forwardRef<PlusDividerRef, PlusDividerProps>(
  function PlusDivider(
    {
      children,
      orientation = "horizontal",
      kind = "solid",
      thickness = "thin",
      contentPosition = "center",
    },
    forwardedRef
  ) {
    const ref = useRef<any>(null);

    useImperativeHandle(forwardedRef, () => ({
      element: ref.current,
    }));

    return (
      <plus-divider
        ref={ref}
        orientation={orientation}
        kind={kind}
        thickness={thickness}
        content-position={contentPosition}
      >
        {children}
      </plus-divider>
    );
  }
);

export default PlusDivider;
