import { useState, useRef, useCallback, useEffect } from 'react';
import { CodeWidgetProps } from './CodeWidget.types';
import './CodeWidget.scss';

/**
 * CodeWidget — syntax-highlighted code display with optional editing and AI generation.
 *
 * @example
 * // Read-only display
 * <CodeWidget
 *   title="server.ts"
 *   language="typescript"
 *   code={`import express from 'express';\nconst app = express();\napp.listen(3000);`}
 *   showCopy
 *   showLineNumbers
 * />
 *
 * @example
 * // Editable code pad with auto-growing textarea
 * <CodeWidget
 *   language="python"
 *   code={code}
 *   editable
 *   onChange={setCode}
 * />
 *
 * @example
 * // AI-powered snippet generator
 * <CodeWidget
 *   language="typescript"
 *   code={snippet}
 *   onAiGenerate={async (prompt) => {
 *     const result = await fetchSnippet(prompt);
 *     setSnippet(result);
 *   }}
 *   showCopy
 * />
 */
export function CodeWidget({
  code = '',
  language = 'plaintext',
  title,
  showCopy = true,
  showLineNumbers = false,
  maxHeight = '400px',
  highlightLines = [],
  editable = false,
  onChange,
  onAiGenerate,
  loading = false,
  className = '',
}: CodeWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = useCallback(async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [code]);

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

  // FIX: auto-resize the textarea to fit its content whenever code changes
  useEffect(() => {
    if (!editable || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [code, editable]);

  // Clean up copy timer on unmount
  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const busy = loading || aiLoading;
  const lines = code.split('\n');

  const rootClasses = ['ww-code', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {/* Top toolbar */}
      <div className="ww-code__toolbar">
        <div className="ww-code__toolbar-left">
          <span className="ww-code__dot ww-code__dot--red" />
          <span className="ww-code__dot ww-code__dot--yellow" />
          <span className="ww-code__dot ww-code__dot--green" />
          {title && <span className="ww-code__title">{title}</span>}
        </div>
        <div className="ww-code__toolbar-right">
          <span className="ww-code__lang-badge">{language}</span>
          {showCopy && code && (
            <button
              type="button"
              className="ww-code__copy-btn"
              onClick={() => { void handleCopy(); }}
              aria-label="Copy code"
            >
              {copied ? '✓ Copied' : '⎘ Copy'}
            </button>
          )}
        </div>
      </div>

      {/* AI prompt bar */}
      {onAiGenerate && (
        <div className="ww-code__ai-bar">
          <span className="ww-code__ai-prefix">✦</span>
          <input
            className="ww-code__ai-input"
            type="text"
            placeholder="Describe the code you want… e.g. 'React hook that debounces a value'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void handleAiSubmit(); }}
            disabled={busy}
            aria-label="AI code generation prompt"
          />
          <button
            type="button"
            className="ww-code__ai-btn"
            onClick={() => { void handleAiSubmit(); }}
            disabled={!prompt.trim() || busy}
            aria-label={aiLoading ? 'Generating…' : 'Generate code'}
          >
            {aiLoading ? <span className="ww-code__spinner" aria-hidden="true" /> : 'Generate'}
          </button>
        </div>
      )}

      {/* Code area */}
      <div className="ww-code__scroll" style={{ maxHeight }}>
        {busy && !code ? (
          <div className="ww-code__loading">
            <span className="ww-code__spinner ww-code__spinner--lg" />
            <span>Generating code…</span>
          </div>
        ) : editable ? (
          // FIX: overflow-y hidden + auto height via useEffect so the textarea grows with content
          <textarea
            ref={textareaRef}
            className="ww-code__textarea"
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            spellCheck={false}
            aria-label={title ?? 'Editable code'}
            style={{ overflowY: 'hidden', resize: 'none' }}
          />
        ) : (
          <table className="ww-code__table" aria-label={title ?? 'Code block'}>
            <tbody>
              {lines.map((line, i) => {
                const lineNum = i + 1;
                const highlighted = highlightLines.includes(lineNum);
                return (
                  <tr
                    key={`line-${i}`}
                    className={['ww-code__row', highlighted ? 'ww-code__row--highlighted' : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {showLineNumbers && (
                      <td className="ww-code__line-num" aria-hidden="true">
                        {lineNum}
                      </td>
                    )}
                    <td className="ww-code__line">
                      <span>{line || ' '}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

CodeWidget.displayName = 'CodeWidget';
