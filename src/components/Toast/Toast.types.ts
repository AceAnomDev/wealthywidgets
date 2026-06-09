import { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastItem {
  /** Unique identifier */
  id: string;
  /** Toast message */
  message: ReactNode;
  /** Visual colour variant */
  variant?: ToastVariant;
  /** Optional title displayed above the message */
  title?: string;
  /** Duration in ms before auto-dismiss. Pass 0 to disable auto-dismiss. */
  duration?: number;
  /** Icon override */
  icon?: ReactNode;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Where toasts appear on screen */
  position?: ToastPosition;
  /** Default auto-dismiss duration in ms (default: 4000) */
  defaultDuration?: number;
}

export interface ToastContextValue {
  /** Show a new toast. Returns the toast id. */
  toast: (item: Omit<ToastItem, 'id'>) => string;
  /** Dismiss a toast by id */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}
