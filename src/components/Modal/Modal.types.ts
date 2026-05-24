import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when the modal should close (Escape key, backdrop click, close button) */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Optional description shown below the title */
  description?: string;
  /** Modal body content */
  children?: ReactNode;
  /** Footer content — typically action buttons */
  footer?: ReactNode;
  /** Modal width preset */
  size?: ModalSize;
  /** Prevent closing on backdrop click */
  disableBackdropClose?: boolean;
  /** Hide the close (×) button */
  hideCloseButton?: boolean;
  /** Additional class on the modal panel */
  className?: string;
  /** aria-labelledby id — auto-generated if omitted */
  labelId?: string;
}
