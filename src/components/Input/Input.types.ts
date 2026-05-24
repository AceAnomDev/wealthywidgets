import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Hint / helper text shown below the input */
  hint?: string;
  /** Validation / status message */
  message?: string;
  /** Validation status — controls colours */
  status?: InputStatus;
  /** Icon displayed on the left side */
  leftIcon?: ReactNode;
  /** Icon or element on the right side (e.g. clear button, eye toggle) */
  rightElement?: ReactNode;
  /** Input size */
  size?: InputSize;
  /** Stretch input to fill its container */
  fullWidth?: boolean;
  /** Make the field read-only with styled appearance */
  readOnly?: boolean;
  /** Enable the AI ✦ button — called with the current input value as prompt */
  onAiGenerate?: (prompt: string) => Promise<string | void>;
  /** Show loading spinner on the AI button */
  aiLoading?: boolean;
}
