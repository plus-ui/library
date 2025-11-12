"use client";

/// <reference types="react" />

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type { ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "plus-input": any;
    }
  }
}

interface PlusInputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  label?: string;
  type?: "date" | "datetime-local" | "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url";
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | "any";
  autocomplete?: string;
  autocorrect?: "off" | "on";
  autoFocus?: boolean;
  spellCheck?: boolean;
  name?: string;
  caption?: string;
  error?: boolean;
  errorMessage?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
  passwordVisible?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  inputmode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
  onPasswordToggle?: (visible: boolean) => void;
  onInvalid?: (validationMessage: string) => void;
}

export interface PlusInputRef {
  element: HTMLElement | null;
  value: string;
  focus: () => void;
  blur: () => void;
  checkValidity: () => boolean;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
}

const PlusInput = forwardRef<PlusInputRef, PlusInputProps>(function PlusInput({
  prefix,
  suffix,
  fullWidth = false,
  label,
  type = "text",
  placeholder,
  value,
  required,
  disabled,
  readonly,
  size = "md",
  pattern,
  minlength,
  maxlength,
  min,
  max,
  step,
  autocomplete,
  autocorrect,
  autoFocus,
  spellCheck,
  name,
  caption,
  error,
  errorMessage,
  clearable,
  passwordToggle,
  passwordVisible,
  prefixIcon,
  suffixIcon,
  enterkeyhint,
  inputmode,
  onChange,
  onInput,
  onBlur,
  onFocus,
  onClear,
  onPasswordToggle,
  onInvalid,
}, forwardedRef) {
  const ref = useRef<any>(null);

  useImperativeHandle(forwardedRef, () => ({
    element: ref.current,
    get value() {
      return ref.current?.value || "";
    },
    focus: () => ref.current?.focus(),
    blur: () => ref.current?.blur(),
    checkValidity: () => ref.current?.checkValidity() || false,
    reportValidity: () => ref.current?.reportValidity() || false,
    setCustomValidity: (message: string) => ref.current?.setCustomValidity(message),
  }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleInput = (e: CustomEvent) => {
      const value = e.detail?.value || e.target?.value || "";
      onInput?.(value);
      onChange?.(value);
    };

    const handleChange = (e: CustomEvent) => {
      const value = e.detail?.value || e.target?.value || "";
      onChange?.(value);
    };

    const handleBlur = () => {
      onBlur?.();
    };

    const handleFocus = () => {
      onFocus?.();
    };

    const handleClear = () => {
      onClear?.();
    };

    const handlePasswordToggle = (e: CustomEvent) => {
      onPasswordToggle?.(e.detail?.visible);
    };

    const handleInvalid = (e: CustomEvent) => {
      onInvalid?.(e.detail?.validationMessage);
    };

    el.addEventListener("plus-input", handleInput);
    el.addEventListener("plus-change", handleChange);
    el.addEventListener("plus-blur", handleBlur);
    el.addEventListener("plus-focus", handleFocus);
    el.addEventListener("plus-clear", handleClear);
    el.addEventListener("plus-password-toggle", handlePasswordToggle);
    el.addEventListener("plus-invalid", handleInvalid);

    return () => {
      el.removeEventListener("plus-input", handleInput);
      el.removeEventListener("plus-change", handleChange);
      el.removeEventListener("plus-blur", handleBlur);
      el.removeEventListener("plus-focus", handleFocus);
      el.removeEventListener("plus-clear", handleClear);
      el.removeEventListener("plus-password-toggle", handlePasswordToggle);
      el.removeEventListener("plus-invalid", handleInvalid);
    };
  }, [onChange, onInput, onBlur, onFocus, onClear, onPasswordToggle, onInvalid]);

  useEffect(() => {
    if (ref.current && value !== undefined) {
      ref.current.value = value;
    }
  }, [value]);

  return (
    <plus-input
      ref={ref}
      label={label}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readonly={readonly}
      size={size}
      pattern={pattern}
      minlength={minlength}
      maxlength={maxlength}
      min={min}
      max={max}
      step={step}
      autocomplete={autocomplete}
      autocorrect={autocorrect}
      autofocus={autoFocus}
      spellcheck={spellCheck}
      name={name}
      caption={caption}
      error={error}
      error-message={errorMessage}
      clearable={clearable}
      password-toggle={passwordToggle}
      password-visible={passwordVisible}
      prefix-icon={prefixIcon}
      suffix-icon={suffixIcon}
      enterkeyhint={enterkeyhint}
      inputmode={inputmode}
      full-width={fullWidth}
    >
      {prefix && <div slot="prefix">{prefix}</div>}
      {suffix && <div slot="suffix">{suffix}</div>}
    </plus-input>
  );
});

export default PlusInput;
