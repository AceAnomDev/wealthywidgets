export type CodeLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'rust'
  | 'go'
  | 'bash'
  | 'json'
  | 'css'
  | 'html'
  | 'sql'
  | 'plaintext';

export interface CodeWidgetProps {
  /** Source code to display */
  code?: string;
  /** Programming language for syntax hint badge */
  language?: CodeLanguage;
  /** Widget heading */
  title?: string;
  /** Show copy-to-clipboard button */
  showCopy?: boolean;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Maximum height before scroll (e.g. "300px") */
  maxHeight?: string;
  /** Highlighted line numbers (1-indexed) */
  highlightLines?: number[];
  /** Allow user to edit the code inline */
  editable?: boolean;
  /** Callback fired when editable code changes */
  onChange?: (code: string) => void;
  /** Callback fired when the user submits an AI generation prompt */
  onAiGenerate?: (prompt: string) => Promise<void>;
  /** Loading state */
  loading?: boolean;
  /** Additional className */
  className?: string;
}
