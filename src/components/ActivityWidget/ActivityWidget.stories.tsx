import type { Meta, StoryObj } from '@storybook/react';
import { ActivityWidget } from './ActivityWidget';

const meta: Meta<typeof ActivityWidget> = {
  title: 'Widgets/ActivityWidget',
  component: ActivityWidget,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Scrollable event timeline with status dots, relative timestamps, and optional AI-powered feed generation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onAiGenerate: { action: 'onAiGenerate' },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityWidget>;

const sampleItems = [
  {
    id: 1,
    label: 'PR #142 merged',
    description: 'feat: add dark mode support',
    status: 'success' as const,
    timestamp: '3m ago',
  },
  {
    id: 2,
    label: 'Build failed',
    description: 'Unit test timeout on CI',
    status: 'danger' as const,
    timestamp: '12m ago',
  },
  {
    id: 3,
    label: 'Deploy started',
    description: 'v1.2.0 → production',
    status: 'info' as const,
    timestamp: '18m ago',
  },
  {
    id: 4,
    label: 'New issue opened',
    description: 'Dropdown z-index overlaps modal',
    status: 'warning' as const,
    timestamp: '1h ago',
  },
  {
    id: 5,
    label: 'Release tagged',
    description: 'v1.1.5',
    status: 'success' as const,
    timestamp: '2h ago',
  },
  { id: 6, label: 'Docs updated', status: 'default' as const, timestamp: '3h ago' },
];

export const Default: Story = {
  args: {
    title: 'Recent Activity',
    items: sampleItems,
  },
};

export const Bordered: Story = {
  args: {
    title: 'Team Activity',
    items: sampleItems,
    bordered: true,
  },
};

export const Compact: Story = {
  args: {
    title: 'Activity',
    items: sampleItems,
    compact: true,
    maxVisible: 4,
  },
};

export const WithAiBar: Story = {
  args: {
    title: 'AI-Powered Feed',
    items: sampleItems.slice(0, 3),
    onAiGenerate: async (prompt: string) => {
      console.log('Prompt:', prompt);
      await new Promise((r) => setTimeout(r, 1500));
    },
  },
};

export const Empty: Story = {
  args: {
    title: 'No Activity Yet',
    items: [],
  },
};
