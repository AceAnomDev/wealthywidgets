import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CodeWidget } from './CodeWidget';

const meta: Meta<typeof CodeWidget> = {
  title: 'Widgets/CodeWidget',
  component: CodeWidget,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dark-themed code block with macOS toolbar, copy button, line numbers, editable mode, and AI snippet generation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeWidget>;

const tsSnippet = `import { useState, useCallback } from 'react';

interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initial = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;
  const [count, setCount] = useState(initial);

  const inc = useCallback(
    () => setCount((c) => Math.min(c + 1, max)),
    [max],
  );
  const dec = useCallback(
    () => setCount((c) => Math.max(c - 1, min)),
    [min],
  );
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, inc, dec, reset };
}`;

const pySnippet = `def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]


if __name__ == "__main__":
    print(fibonacci(10))`;

const sqlSnippet = `SELECT
  u.id,
  u.name,
  COUNT(o.id)   AS order_count,
  SUM(o.total)  AS lifetime_value
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= NOW() - INTERVAL '90 days'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY lifetime_value DESC
LIMIT 20;`;

export const TypeScript: Story = {
  args: {
    title: 'useCounter.ts',
    language: 'typescript',
    code: tsSnippet,
    showCopy: true,
    showLineNumbers: true,
    highlightLines: [7, 8],
    maxHeight: '360px',
  },
};

export const Python: Story = {
  args: {
    title: 'fibonacci.py',
    language: 'python',
    code: pySnippet,
    showCopy: true,
    showLineNumbers: true,
  },
};

export const SQL: Story = {
  args: {
    title: 'top_customers.sql',
    language: 'sql',
    code: sqlSnippet,
    showCopy: true,
  },
};

export const Editable: Story = {
  render: () => {
    const [code, setCode] = useState(pySnippet);
    return (
      <CodeWidget
        title="Edit me"
        language="python"
        code={code}
        editable
        onChange={setCode}
        maxHeight="300px"
      />
    );
  },
};

export const WithAiBar: Story = {
  args: {
    title: 'Generated snippet',
    language: 'typescript',
    code: tsSnippet,
    showCopy: true,
    showLineNumbers: true,
    onAiGenerate: async (prompt: string) => {
      console.log('Prompt:', prompt);
      await new Promise((r) => setTimeout(r, 1500));
    },
  },
};
