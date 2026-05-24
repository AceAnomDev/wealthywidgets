import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon placed before the label */
  leftIcon?: ReactNode;
  /** Icon placed after the label */
  rightIcon?: ReactNode;
  /** Stretch button to fill its container */
  fullWidth?: boolean;
  /** Render as pill shape */
  rounded?: boolean;
  /** Button label */
  children: ReactNode;
}
