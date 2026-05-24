import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  useId,
} from 'react';
import { DropdownProps } from './Dropdown.types';
import './Dropdown.scss';

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Dropdown — select menu with optional search and multi-select.
 *
 * @example
 * // Single select
 * <Dropdown
 *   label="Country"
 *   options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]}
 *   value={country}
 *   onChange={v => setCountry(v as string)}
 * />
 *
 * @example
 * // Multi-select with search
 * <Dropdown
 *   label="Skills"
 *   multiple
 *   searchable
 *   options={skillOptions}
 *   value={skills}
 *   onChange={v => setSkills(v as string[])}
 * />
 */
export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search…',
  label,
  disabled = false,
  emptyMessage = 'No results found',
  fullWidth = false,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerId = useId();

  const selectedValues: string[] = multiple
    ? Array.isArray(value) ? value : []
    : value ? [value as string] : [];

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  const isSelected = (val: string) => selectedValues.includes(val);

  const handleToggle = (val: string) => {
    if (multiple) {
      const next = isSelected(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      onChange?.(next);
    } else {
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleRemoveTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      onChange?.(selectedValues.filter((v) => v !== val));
    }
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  // Close on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Focus search when menu opens
  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    if (!open) setQuery('');
  }, [open, searchable]);

  const getLabel = (val: string) =>
    options.find((o) => o.value === val)?.label ?? val;

  const rootClasses = [
    'ww-dropdown',
    fullWidth ? 'ww-dropdown--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} ref={containerRef}>
      {label && (
        <label className="ww-dropdown__label" htmlFor={triggerId}>
          {label}
        </label>
      )}

      <button
        id={triggerId}
        type="button"
        className="ww-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="ww-dropdown__trigger-content">
          {selectedValues.length === 0 ? (
            <span className="ww-dropdown__placeholder">{placeholder}</span>
          ) : multiple ? (
            selectedValues.map((val) => (
              <span key={val} className="ww-dropdown__tag">
                <span className="ww-dropdown__tag-label">{getLabel(val)}</span>
                <span
                  className="ww-dropdown__tag-remove"
                  role="button"
                  aria-label={`Remove ${getLabel(val)}`}
                  onClick={(e) => handleRemoveTag(val, e)}
                >
                  ✕
                </span>
              </span>
            ))
          ) : (
            <span className="ww-dropdown__selected-text">
              {getLabel(selectedValues[0])}
            </span>
          )}
        </span>

        <ChevronIcon
          className={`ww-dropdown__chevron${open ? ' ww-dropdown__chevron--open' : ''}`}
        />
      </button>

      {open && (
        <div className="ww-dropdown__menu" role="listbox" aria-multiselectable={multiple}>
          {searchable && (
            <div className="ww-dropdown__search">
              <input
                ref={searchRef}
                className="ww-dropdown__search-field"
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search options"
              />
            </div>
          )}

          <ul className="ww-dropdown__list">
            {filtered.length === 0 ? (
              <li className="ww-dropdown__empty">{emptyMessage}</li>
            ) : (
              filtered.map((opt) => {
                const selected = isSelected(opt.value);
                const optionClasses = [
                  'ww-dropdown__option',
                  selected ? 'ww-dropdown__option--selected' : '',
                  opt.disabled ? 'ww-dropdown__option--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <li
                    key={opt.value}
                    className={optionClasses}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && handleToggle(opt.value)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !opt.disabled) {
                        e.preventDefault();
                        handleToggle(opt.value);
                      }
                    }}
                    tabIndex={opt.disabled ? -1 : 0}
                  >
                    {opt.icon && (
                      <span className="ww-dropdown__option-icon">{opt.icon}</span>
                    )}
                    <span className="ww-dropdown__option-text">
                      <span className="ww-dropdown__option-label">{opt.label}</span>
                      {opt.description && (
                        <span className="ww-dropdown__option-description">
                          {opt.description}
                        </span>
                      )}
                    </span>
                    {selected && (
                      <span className="ww-dropdown__option-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Dropdown.displayName = 'Dropdown';
