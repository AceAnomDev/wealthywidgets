import { useEffect, useId, useCallback, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import './Modal.scss';

/**
 * Modal — accessible dialog with title, body, and footer buttons.
 *
 * The modal is rendered via a React Portal so it always escapes stacking contexts.
 *
 * @example
 * // Basic usage
 * const [open, setOpen] = useState(false);
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm deletion"
 *   description="This action cannot be undone."
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *     </>
 *   }
 * >
 *   Are you sure you want to delete this item?
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  disableBackdropClose = false,
  hideCloseButton = false,
  className = '',
  labelId: labelIdProp,
}: ModalProps) {
  const generatedId = useId();
  const labelId = labelIdProp ?? `${generatedId}-title`;

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const hasHeader = title || description || !hideCloseButton;

  const panelClasses = [
    'ww-modal__panel',
    `ww-modal__panel--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className="ww-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? labelId : undefined}
      onClick={handleBackdropClick}
    >
      <div className={panelClasses}>
        {hasHeader && (
          <div className="ww-modal__header">
            <div className="ww-modal__header-text">
              {title && (
                <h2 id={labelId} className="ww-modal__title">
                  {title}
                </h2>
              )}
              {description && (
                <p className="ww-modal__description">{description}</p>
              )}
            </div>

            {!hideCloseButton && (
              <button
                className="ww-modal__close"
                onClick={onClose}
                aria-label="Close dialog"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {children !== undefined && (
          <div className="ww-modal__body">{children}</div>
        )}

        {footer && <div className="ww-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

Modal.displayName = 'Modal';
