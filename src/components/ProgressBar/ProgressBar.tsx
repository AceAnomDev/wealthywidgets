import { ProgressBarProps } from './ProgressBar.types';
import './ProgressBar.scss';

/**
 * ProgressBar — status-coloured progress indicator.
 *
 * @example
 * // Basic
 * <ProgressBar value={65} />
 *
 * @example
 * // Danger with label
 * <ProgressBar value={90} status="danger" showLabel title="Disk usage" />
 *
 * @example
 * // Striped loading bar
 * <ProgressBar value={40} status="info" striped showLabel labelPosition="right" />
 */
export function ProgressBar({
  value,
  max = 100,
  status = 'default',
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  formatLabel,
  title,
  striped = false,
  ariaLabel,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(0, value), max);
  const pct = (clamped / max) * 100;

  const label = formatLabel
    ? formatLabel(clamped, max)
    : `${Math.round(pct)}%`;

  const rootClasses = ['ww-progress', className].filter(Boolean).join(' ');
  const trackClasses = `ww-progress__track ww-progress__track--${size}`;
  const fillClasses = [
    'ww-progress__fill',
    `ww-progress__fill--${status}`,
    striped ? 'ww-progress__fill--striped' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const hasTopLabel = showLabel && labelPosition === 'top';
  const hasRightLabel = showLabel && labelPosition === 'right';
  const hasInsideLabel = showLabel && labelPosition === 'inside' && size === 'lg';

  return (
    <div className={rootClasses}>
      {(title || hasTopLabel) && (
        <div className="ww-progress__header">
          {title && <span className="ww-progress__title">{title}</span>}
          {hasTopLabel && (
            <span className="ww-progress__label--top">{label}</span>
          )}
        </div>
      )}

      <div className="ww-progress__row">
        <div
          className={trackClasses}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel ?? title ?? 'Progress'}
        >
          <div className={fillClasses} style={{ width: `${pct}%` }}>
            {hasInsideLabel && (
              <span className="ww-progress__label--inside">{label}</span>
            )}
          </div>
        </div>

        {hasRightLabel && (
          <span className="ww-progress__label--right">{label}</span>
        )}
      </div>
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
