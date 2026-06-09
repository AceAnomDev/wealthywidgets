import { forwardRef, useId } from 'react';
import { InputProps } from './Input.types';
import './Input.scss';

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'error') return <span aria-hidden="true">✕</span>;
  if (status === 'success') return <span aria-hidden="true">✓</span>;
  if (status === 'warning') return <span aria-hidden="true">⚠</span>;
  return null;
};

/**
 * Input — text field with icon, hint, and validation support.
 *
 * @example
 * // Basic usage
 * <Input label="Email" type="email" placeholder="you@example.com" />
 *
 * @example
 * // With icon and validation
 * <Input
 *   label="Username"
 *   leftIcon={<UserIcon />}
 *   status="error"
 *   message="Username already taken"
 *   value={username}
 *   onChange={e => setUsername(e.target.value)}
 * />
 *
 * @example
 * // With hint
 * <Input label="Password" type="password" hint="At least 8 characters" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      message,
      status = 'default',
      leftIcon,
      rightElement,
      size = 'md',
      fullWidth = false,
      disabled = false,
      readOnly = false,
      required,
      className = '',
      id: idProp,
      onAiGenerate,
      aiLoading = false,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hintId = `${id}-hint`;
    const messageId = `${id}-message`;

    const wrapperClasses = [
      'ww-input__wrapper',
      `ww-input__wrapper--${size}`,
      status !== 'default' ? `ww-input__wrapper--${status}` : '',
      disabled ? 'ww-input__wrapper--disabled' : '',
      readOnly ? 'ww-input__wrapper--readonly' : '',
      leftIcon ? 'ww-input__wrapper--has-left' : '',
      rightElement ? 'ww-input__wrapper--has-right' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const rootClasses = [
      'ww-input',
      fullWidth ? 'ww-input--full-width' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const describedBy = [hint ? hintId : '', message ? messageId : '']
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={rootClasses}>
        {label && (
          <label className="ww-input__label" htmlFor={id}>
            {label}
            {required && <span className="ww-input__label-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          {leftIcon && (
            <span className="ww-input__left-icon" aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className="ww-input__field"
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={status === 'error'}
            aria-describedby={describedBy}
            {...rest}
          />

          {rightElement && (
            <span className="ww-input__right-element">{rightElement}</span>
          )}
          {onAiGenerate && (
            <button
              type="button"
              className={['ww-input__ai-btn', aiLoading ? 'ww-input__ai-btn--loading' : ''].filter(Boolean).join(' ')}
              onClick={() => {
                const val = typeof rest.value === 'string' ? rest.value : '';
                void onAiGenerate(val)
                  .then((result) => {
                    if (result && rest.onChange) {
                      const synth = { target: { value: result } } as React.ChangeEvent<HTMLInputElement>;
                      rest.onChange(synth);
                    }
                  })
                  .catch(() => {
                    // Errors are handled by the parent via aiLoading / status props
                  });
              }}
              disabled={aiLoading || disabled}
              aria-label="Generate with AI"
            >
              {aiLoading ? <span className="ww-input__ai-spinner" aria-hidden="true" /> : '✦'}
            </button>
          )}
        </div>

        {hint && (
          <span id={hintId} className="ww-input__hint">
            {hint}
          </span>
        )}

        {message && (
          <span id={messageId} className={`ww-input__message ww-input__message--${status}`} role={status === 'error' ? 'alert' : undefined}>
            <StatusIcon status={status} />
            {message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
