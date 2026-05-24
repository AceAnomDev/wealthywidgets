import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Image URL displayed at the top of the card */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Image aspect ratio */
  imageAspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
  /** Card body text */
  description?: string;
  /** Action area — typically buttons */
  actions?: ReactNode;
  /** Extra content slot (badges, tags, etc.) rendered in the header */
  headerExtra?: ReactNode;
  /** Card style variant */
  variant?: CardVariant;
  /** Remove padding from the card body */
  noPadding?: boolean;
  /** Make the card look clickable (hover effect) */
  clickable?: boolean;
  /** Custom children override (replaces description) */
  children?: ReactNode;
}
