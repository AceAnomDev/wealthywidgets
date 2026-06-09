import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ToastItem,
  ToastContextValue,
  ToastProviderProps,
  ToastVariant,
} from './Toast.types';
import './Toast.scss';

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_ICON: Record<ToastVariant, string> = {
  default: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger:  '✕',
  info:    'ℹ',
};

// ─── Single Toast Item ─────────────────────────────────────────────────────────

function ToastEntry({
  item,
  onDismiss,
  defaultDuration,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
  defaultDuration: number;
}) {
  const [exiting, setExiting] = useState(false);
  const duration = item.duration ?? defaultDuration;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 300);
  }, [item.id, onDismiss]);

  useEffect(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(dismiss, duration);
    return () => clearTimeout(timerRef.current);
  }, [duration, dismiss]);

  const classes = [
    'ww-toast',
    `ww-toast--${item.variant ?? 'default'}`,
    exiting ? 'ww-toast--exiting' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={() => {
        if (duration > 0) {
          timerRef.current = setTimeout(dismiss, duration);
        }
      }}
    >
      <span className="ww-toast__icon" aria-hidden="true">
        {item.icon ?? VARIANT_ICON[item.variant ?? 'default']}
      </span>
      <div className="ww-toast__body">
        {item.title && <p className="ww-toast__title">{item.title}</p>}
        <p className="ww-toast__message">{item.message}</p>
      </div>
      <button
        className="ww-toast__close"
        onClick={dismiss}
        aria-label="Dismiss notification"
        type="button"
      >
        ✕
      </button>
      {duration > 0 && (
        <span
          className="ww-toast__progress"
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * ToastProvider — wrap your app (or a subtree) to enable toasts.
 *
 * @example
 * // In your root:
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 *
 * // In any child component:
 * const { toast } = useToast();
 * toast({ message: 'Saved!', variant: 'success' });
 */
export function ToastProvider({
  children,
  position = 'top-right',
  defaultDuration = 4000,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (item: Omit<ToastItem, 'id'>): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setItems((prev) => [...prev, { ...item, id }]);
      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setItems([]), []);

  const positionClass = `ww-toast-container--${position}`;

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {createPortal(
        <div className={`ww-toast-container ${positionClass}`} aria-label="Notifications">
          {items.map((item) => (
            <ToastEntry
              key={item.id}
              item={item}
              onDismiss={dismiss}
              defaultDuration={defaultDuration}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = 'ToastProvider';

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useToast — access toast controls from any component inside ToastProvider.
 *
 * @example
 * const { toast, dismiss } = useToast();
 * toast({ message: 'Changes saved', variant: 'success', duration: 3000 });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}
