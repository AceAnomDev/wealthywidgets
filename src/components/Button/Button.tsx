import { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import './Button.scss';

/**
 * Button — interactive element with multiple style variants and sizes.
 *
 * @example
 * // Primary button
 * <Button variant="primary" size="md" onClick={handleClick}>Save</Button>
 *
 * @example
 * // Loading state
 * <Button variant="primary" loading>Saving...</Button>
 *
 * @example
 * // With icons
 * <Button variant="outline" leftIcon={<SearchIcon />}>Search</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'ww-button',
      `ww-button--${variant}`,
      `ww-button--${size}`,
      fullWidth ? 'ww-button--full-width' : '',
      rounded ? 'ww-button--rounded' : '',
      loading ? 'ww-button--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading ? (
          <span className="ww-button__spinner" aria-hidden="true" />
        ) : (
          leftIcon && <span className="ww-button__icon">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ww-button__icon">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
