import { ReactNode } from 'react';

export type ActivityStatus = 'success' | 'warning' | 'danger' | 'info' | 'default';

export interface ActivityItem {
  /** Unique identifier */
  id: string | number;
  /** Primary label / title of the event */
  label: string;
  /** Supporting detail text */
  description?: string;
  /** Timestamp — string (e.g. "2 min ago") or Date object */
  timestamp?: string | Date;
  /** Optional icon rendered in the dot area */
  icon?: ReactNode;
  /** Colour of the timeline dot */
  status?: ActivityStatus;
}

export interface ActivityWidgetProps {
  /** Activity feed items */
  items: ActivityItem[];
  /** Widget heading */
  title?: string;
  /** Compact mode: reduces vertical spacing */
  compact?: boolean;
  /** Show a coloured left border on each item */
  bordered?: boolean;
  /** Max items to display before "show more" */
  maxVisible?: number;
  /** Callback when user asks the AI to generate items */
  onAiGenerate?: (prompt: string) => Promise<void>;
  /** Loading state for AI generation */
  loading?: boolean;
  /** Additional className */
  className?: string;
}
