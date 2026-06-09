import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual colour variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Render as a pill (fully rounded) */
  pill?: boolean;
  /** Small numeric/dot indicator in the top-right corner */
  dot?: boolean;
  /** Number shown in the dot indicator (omit for a plain dot) */
  count?: number;
  /** Cap displayed count at this value (appends "+") */
  max?: number;
  /** Badge label */
  children?: ReactNode;
}
