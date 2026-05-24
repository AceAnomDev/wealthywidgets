import { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'dark' | 'light' | 'primary';

export interface TooltipProps {
  /** The element that triggers the tooltip */
  children: ReactNode;
  /** Tooltip content */
  content: ReactNode;
  /** Preferred placement */
  placement?: TooltipPlacement;
  /** Visual style */
  variant?: TooltipVariant;
  /** Delay before showing (ms) */
  showDelay?: number;
  /** Delay before hiding (ms) */
  hideDelay?: number;
  /** Disable the tooltip */
  disabled?: boolean;
  /** Max width of the tooltip bubble */
  maxWidth?: number | string;
  /** Additional class on the tooltip bubble */
  className?: string;
}
