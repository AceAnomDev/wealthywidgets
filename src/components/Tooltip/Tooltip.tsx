import { useState, useRef, useCallback, useId, CSSProperties } from 'react';
import { TooltipProps } from './Tooltip.types';
import './Tooltip.scss';

/**
 * Tooltip — lightweight hover hint with placement and variant options.
 *
 * @example
 * // Basic
 * <Tooltip content="Save your work">
 *   <Button>Save</Button>
 * </Tooltip>
 *
 * @example
 * // Bottom placement, light variant
 * <Tooltip content="More info here" placement="bottom" variant="light">
 *   <InfoIcon />
 * </Tooltip>
 *
 * @example
 * // Rich content
 * <Tooltip content={<span><b>Shortcut:</b> ⌘S</span>} placement="right">
 *   <span>Hover me</span>
 * </Tooltip>
 */
export function Tooltip({
  children,
  content,
  placement = 'top',
  variant = 'dark',
  showDelay = 300,
  hideDelay = 100,
  disabled = false,
  maxWidth = 240,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), showDelay);
  }, [disabled, showDelay]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), hideDelay);
  }, [hideDelay]);

  const bubbleClasses = [
    'ww-tooltip__bubble',
    `ww-tooltip__bubble--${variant}`,
    `ww-tooltip__bubble--${placement}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: CSSProperties = {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    whiteSpace: typeof content === 'string' ? 'nowrap' : 'normal',
  };

  return (
    <span
      className="ww-tooltip__wrapper"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}

      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={bubbleClasses}
          style={style}
        >
          {content}
          <span className="ww-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  );
}

Tooltip.displayName = 'Tooltip';
