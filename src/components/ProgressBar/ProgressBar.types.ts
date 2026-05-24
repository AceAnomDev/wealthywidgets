export type ProgressBarStatus = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** Progress value, 0–100 */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Visual colour status */
  status?: ProgressBarStatus;
  /** Bar thickness */
  size?: ProgressBarSize;
  /** Show numeric percentage label */
  showLabel?: boolean;
  /** Label position relative to bar */
  labelPosition?: 'right' | 'top' | 'inside';
  /** Custom label format function */
  formatLabel?: (value: number, max: number) => string;
  /** Text label shown above the bar */
  title?: string;
  /** Animate bar fill on mount */
  animated?: boolean;
  /** Animate with a shimmer effect (for indeterminate / loading state) */
  striped?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** Additional class */
  className?: string;
}
