import { ReactNode } from 'react';

export interface DropdownOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Descriptive text shown beneath the label */
  description?: string;
  /** Leading icon or thumbnail */
  icon?: ReactNode;
  /** Prevent selection */
  disabled?: boolean;
}

export interface DropdownProps {
  /** Available options */
  options: DropdownOption[];
  /** Selected value(s). Pass string[] when multiple=true */
  value?: string | string[];
  /** Called with the new selected value(s) */
  onChange?: (value: string | string[]) => void;
  /** Placeholder shown when nothing is selected */
  placeholder?: string;
  /** Allow selecting more than one option */
  multiple?: boolean;
  /** Show search field inside the dropdown */
  searchable?: boolean;
  /** Placeholder inside the search field */
  searchPlaceholder?: string;
  /** Field label */
  label?: string;
  /** Disable the control */
  disabled?: boolean;
  /** Text shown when the filtered list is empty */
  emptyMessage?: string;
  /** Stretch to fill its container */
  fullWidth?: boolean;
  /** Additional class */
  className?: string;
}
