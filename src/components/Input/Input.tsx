import { forwardRef, InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, hint, className, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className={`${styles.input} ${className ?? ''}`}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {error ? (
        <span id={`${inputId}-error`} className={styles.errorMsg} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export default Input;
