"use client";

/// <reference types="react" />

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import type { ReactNode, Ref } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'plus-modal': any;
    }
  }
}

interface PlusModalProps {
  children?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  closeButton?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  placement?: 'center' | 'top'
  isOpen?: boolean
  fullWidth?: boolean
  fullScreen?: boolean
  backdrop?: boolean | 'static'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  noHeader?: boolean
  noFooter?: boolean
  animationDuration?: number
  onBeforeOpen?: (event: CustomEvent) => void
  onOpen?: (event: CustomEvent) => void
  onBeforeClose?: (event: CustomEvent) => void
  onClose?: (event: CustomEvent) => void
}

export interface PlusModalRef {
  element: HTMLElement | null;
  show: () => Promise<void>;
  hide: () => Promise<void>;
  toggle: () => Promise<void>;
}

const PlusModal = forwardRef<PlusModalRef, PlusModalProps>(function PlusModal({
  children,
  header,
  footer,
  closeButton,
  size = 'md',
  placement = 'center',
  isOpen = false,
  fullWidth = false,
  fullScreen = false,
  backdrop = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  noHeader = false,
  noFooter = false,
  animationDuration = 300,
  onBeforeOpen,
  onOpen,
  onBeforeClose,
  onClose
}: PlusModalProps, forwardedRef: Ref<PlusModalRef>) {
  const ref = useRef<any>(null)

  useImperativeHandle(forwardedRef, () => ({
    element: ref.current,
    show: () => ref.current?.show(),
    hide: () => ref.current?.hide(),
    toggle: () => ref.current?.toggle()
  }))

  // Event listeners
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleBeforeOpen = (e: CustomEvent) => {
      onBeforeOpen?.(e)
    }

    const handleOpen = (e: CustomEvent) => {
      onOpen?.(e)
    }

    const handleBeforeClose = (e: CustomEvent) => {
      onBeforeClose?.(e)
    }

    const handleClose = (e: CustomEvent) => {
      onClose?.(e)
    }

    el.addEventListener('plus-modal-before-open', handleBeforeOpen)
    el.addEventListener('plus-modal-open', handleOpen)
    el.addEventListener('plus-modal-before-close', handleBeforeClose)
    el.addEventListener('plus-modal-close', handleClose)

    return () => {
      el.removeEventListener('plus-modal-before-open', handleBeforeOpen)
      el.removeEventListener('plus-modal-open', handleOpen)
      el.removeEventListener('plus-modal-before-close', handleBeforeClose)
      el.removeEventListener('plus-modal-close', handleClose)
    }
  }, [onBeforeOpen, onOpen, onBeforeClose, onClose])

  return (
    <plus-modal
      ref={ref}
      size={size}
      placement={placement}
      is-open={isOpen}
      full-width={fullWidth}
      full-screen={fullScreen}
      backdrop={backdrop === true ? 'true' : backdrop === false ? 'false' : 'static'}
      close-on-backdrop={closeOnBackdrop}
      close-on-esc={closeOnEsc}
      no-header={noHeader}
      no-footer={noFooter}
      animation-duration={animationDuration}
    >
      {header && <div slot="header">{header}</div>}
      <div slot="body">{children}</div>
      {footer && <div slot="footer">{footer}</div>}
      {closeButton && <div slot="close">{closeButton}</div>}
    </plus-modal>
  )
})

export default PlusModal
