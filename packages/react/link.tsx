"use client";

/// <reference types="react" />

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'plus-link': any;
    }
  }
}

interface PlusLinkProps {
  children?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  href?: string
  target?: string
  rel?: string
  download?: string | boolean
  size?: 'sm' | 'md' | 'lg' | 'inherit'
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  external?: boolean
  underline?: 'always' | 'hover' | 'never'
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface PlusLinkRef {
  element: HTMLElement | null;
}

const PlusLink = forwardRef<PlusLinkRef, PlusLinkProps>(function PlusLink({
  children,
  prefix,
  suffix,
  href,
  target,
  rel,
  download,
  size = 'inherit',
  disabled,
  readonly,
  loading,
  external,
  underline,
  onClick,
  onFocus,
  onBlur
}, forwardedRef) {
  const ref = useRef<any>(null)

  useImperativeHandle(forwardedRef, () => ({
    element: ref.current
  }))

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleClick = (e: MouseEvent) => {
      onClick?.(e)
    }

    const handleFocus = (e: FocusEvent) => {
      onFocus?.(e)
    }

    const handleBlur = (e: FocusEvent) => {
      onBlur?.(e)
    }

    el.addEventListener('plus-click', handleClick)
    el.addEventListener('plus-focus', handleFocus)
    el.addEventListener('plus-blur', handleBlur)

    return () => {
      el.removeEventListener('plus-click', handleClick)
      el.removeEventListener('plus-focus', handleFocus)
      el.removeEventListener('plus-blur', handleBlur)
    }
  }, [onClick, onFocus, onBlur])

  return (
    <plus-link
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      size={size}
      disabled={disabled}
      readonly={readonly}
      loading={loading}
      external={external}
      underline={underline}
    >
      {prefix && <div slot="prefix">{prefix}</div>}
      {children}
      {suffix && <div slot="suffix">{suffix}</div>}
    </plus-link>
  )
})

export default PlusLink
