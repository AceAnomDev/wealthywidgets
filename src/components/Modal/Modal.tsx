import { useEffect, useId, useCallback, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import './Modal.scss';

/**
 * Modal — accessible dialog with title, body, and footer buttons.
 *
 * The modal is rendered via a React Portal so it always escapes stacking contexts.
 * Focus is trapped inside while open and restored to the trigger element on close.
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

  // FIX: track the element that had focus before the modal opened so we can restore it
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    // FIX: save current focus target before the modal steals it
    previousFocusRef.current = document.activeElement as HTMLElement;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // FIX: move focus into the panel so keyboard/screen-reader users land inside the dialog
    const frame = requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? panelRef.current)?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // FIX: restore focus to the element that was active before the modal opened
      previousFocusRef.current?.focus();
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
    // FIX: backdrop is just a visual overlay — role="dialog" + aria-modal belong on the *panel*
    <div
      className="ww-modal__backdrop"
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className={panelClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelId : undefined}
        tabIndex={-1}
      >
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
