import { useState } from 'react';
import { ActivityWidgetProps, ActivityItem } from './ActivityWidget.types';
import './ActivityWidget.scss';

const DEFAULT_MAX_VISIBLE = 5;

function formatTimestamp(ts: string | Date | undefined): string {
  if (!ts) return '';
  if (typeof ts === 'string') return ts;
  const diff = Date.now() - ts.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/**
 * ActivityWidget — scrollable activity / event timeline with optional AI-powered generation.
 *
 * @example
 * // Static feed
 * <ActivityWidget
 *   title="Recent Activity"
 *   items={[
 *     { id: 1, label: "PR merged", description: "feat: add dark mode", status: "success", timestamp: "3m ago" },
 *     { id: 2, label: "Build failed", status: "danger", timestamp: new Date() },
 *   ]}
 * />
 *
 * @example
 * // AI-powered: let users describe what they want
 * <ActivityWidget
 *   title="Team Activity"
 *   items={items}
 *   onAiGenerate={async (prompt) => {
 *     const newItems = await fetchFromAI(prompt);
 *     setItems(newItems);
 *   }}
 * />
 */
export function ActivityWidget({
  items,
  title = 'Activity',
  compact = false,
  bordered = false,
  maxVisible = DEFAULT_MAX_VISIBLE,
  onAiGenerate,
  loading = false,
  className = '',
}: ActivityWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const visible = expanded ? items : items.slice(0, maxVisible);
  const hasMore = items.length > maxVisible;

  const handleAiSubmit = async () => {
    if (!prompt.trim() || !onAiGenerate) return;
    setAiLoading(true);
    try {
      await onAiGenerate(prompt.trim());
      setPrompt('');
    } finally {
      setAiLoading(false);
    }
  };

  const rootClasses = [
    'ww-activity',
    compact ? 'ww-activity--compact' : '',
    bordered ? 'ww-activity--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {title && <h3 className="ww-activity__title">{title}</h3>}

      {onAiGenerate && (
        <div className="ww-activity__ai-bar">
          <input
            className="ww-activity__ai-input"
            type="text"
            placeholder="Describe activity to generate… e.g. 'show 5 team events from today'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void handleAiSubmit(); }}
            disabled={aiLoading || loading}
            aria-label="AI generation prompt"
          />
          <button
            className="ww-activity__ai-btn"
            onClick={() => { void handleAiSubmit(); }}
            disabled={!prompt.trim() || aiLoading || loading}
            aria-label="Generate with AI"
          >
            {aiLoading ? <span className="ww-activity__spinner" /> : '✦'}
          </button>
        </div>
      )}

      {(loading || aiLoading) && items.length === 0 ? (
        <div className="ww-activity__empty">
          <span className="ww-activity__spinner ww-activity__spinner--lg" />
          <span>Generating…</span>
        </div>
      ) : items.length === 0 ? (
        <p className="ww-activity__empty">No activity yet.</p>
      ) : (
        <ol className="ww-activity__list" aria-label={title}>
          {visible.map((item: ActivityItem, idx) => (
            <li
              key={item.id}
              className={[
                'ww-activity__item',
                item.status ? `ww-activity__item--${item.status}` : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="ww-activity__dot" aria-hidden="true">
                {item.icon ?? null}
              </span>
              {idx < visible.length - 1 && (
                <span className="ww-activity__line" aria-hidden="true" />
              )}
              <div className="ww-activity__content">
                <span className="ww-activity__label">{item.label}</span>
                {item.description && (
                  <span className="ww-activity__desc">{item.description}</span>
                )}
                {item.timestamp && (
                  <time className="ww-activity__time">
                    {formatTimestamp(item.timestamp)}
                  </time>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      {hasMore && (
        <button
          className="ww-activity__toggle"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : `Show ${items.length - maxVisible} more`}
        </button>
      )}
    </div>
  );
}

ActivityWidget.displayName = 'ActivityWidget';
