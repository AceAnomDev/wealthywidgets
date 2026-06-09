import { forwardRef } from 'react';
import { CardProps } from './Card.types';
import './Card.scss';

/**
 * Card — flexible content container with image, title, description and actions.
 *
 * @example
 * // Basic card
 * <Card
 *   title="Article Title"
 *   subtitle="Category"
 *   imageSrc="/cover.jpg"
 *   imageAlt="Cover"
 *   description="A brief summary of the article content."
 *   actions={<Button size="sm">Read more</Button>}
 * />
 *
 * @example
 * // Elevated clickable card
 * <Card variant="elevated" clickable onClick={() => navigate('/details')}>
 *   <CustomContent />
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      imageSrc,
      imageAlt = '',
      imageAspectRatio = '16/9',
      description,
      actions,
      headerExtra,
      variant = 'default',
      noPadding = false,
      clickable = false,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = title || subtitle || headerExtra;

    const classes = [
      'ww-card',
      `ww-card--${variant}`,
      clickable ? 'ww-card--clickable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const bodyClasses = [
      'ww-card__body',
      noPadding ? 'ww-card__body--no-padding' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // FIX: replace '/' with '-' so the CSS class name is valid (e.g. "16-9" not "16\/9")
    const aspectClass = imageAspectRatio.replace('/', '-');

    return (
      <div ref={ref} className={classes} {...rest}>
        {imageSrc && (
          <div className={`ww-card__image-wrapper ww-card__image-wrapper--${aspectClass}`}>
            <img src={imageSrc} alt={imageAlt} className="ww-card__image" loading="lazy" />
          </div>
        )}

        <div className={bodyClasses}>
          {hasHeader && (
            <div className="ww-card__header">
              <div className="ww-card__header-text">
                {title && <h3 className="ww-card__title">{title}</h3>}
                {subtitle && <p className="ww-card__subtitle">{subtitle}</p>}
              </div>
              {headerExtra && <div>{headerExtra}</div>}
            </div>
          )}

          {description && <p className="ww-card__description">{description}</p>}

          {children && <div className="ww-card__content">{children}</div>}

          {actions && <div className="ww-card__actions">{actions}</div>}
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
