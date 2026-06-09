import { BadgeProps } from './Badge.types';
import './Badge.scss';

/**
 * Badge — compact label for status, category, or count indicators.
 *
 * @example
 * // Status badge
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * // Notification dot on an icon
 * <Badge dot count={5} max={99}>
 *   <BellIcon />
 * </Badge>
 *
 * @example
 * // Pill shape
 * <Badge variant="primary" pill>New</Badge>
 */
export function Badge({
  variant = 'default',
  size = 'md',
  pill = false,
  dot = false,
  count,
  max = 99,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  const classes = [
    'ww-badge',
    `ww-badge--${variant}`,
    `ww-badge--${size}`,
    pill ? 'ww-badge--pill' : '',
    dot ? 'ww-badge--dot-wrapper' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dotLabel =
    count !== undefined
      ? count > max
        ? `${max}+`
        : String(count)
      : undefined;

  if (dot) {
    return (
      <span className={classes} {...rest}>
        {children}
        <span className="ww-badge__dot" aria-label={dotLabel ? `${dotLabel} notifications` : 'Notification'}>
          {dotLabel}
        </span>
      </span>
    );
  }

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
