"use client";

/// <reference types="react" />

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'plus-button': any;
    }
  }
}

interface PlusButtonProps {
  children?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  kind?: 'filled' | 'outlined' | 'dashed' | 'text'
  status?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  href?: string
  target?: string
  rel?: string
  download?: string
  external?: boolean
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface PlusButtonRef {
  element: HTMLElement | null;
}

const PlusButton = forwardRef<PlusButtonRef, PlusButtonProps>(function PlusButton({
  children,
  prefix,
  suffix,
  type = 'button',
  kind = 'filled',
  status = 'primary',
  size = 'md',
  disabled,
  loading,
  fullWidth,
  href,
  target,
  rel,
  download,
  external,
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

      // Web component içindeki button'ın submit event'ini yakalayıp
      // parent form'a iletmek için
      if (type === 'submit') {
        const form = el.closest('form')
        if (form && !disabled && !loading) {
          // Native submit event trigger et
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
          form.dispatchEvent(submitEvent)
        }
      }
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
  }, [type, disabled, loading, onClick, onFocus, onBlur])

  return (
    <plus-button
      ref={ref}
      type={type}
      kind={kind}
      status={status}
      size={size}
      disabled={disabled}
      loading={loading}
      full-width={fullWidth}
      href={href}
      target={target}
      rel={rel}
      download={download}
      external={external}
    >
      {prefix && <div slot="prefix">{prefix}</div>}
      {children}
      {suffix && <div slot="suffix">{suffix}</div>}
    </plus-button>
  )
})

export default PlusButton
