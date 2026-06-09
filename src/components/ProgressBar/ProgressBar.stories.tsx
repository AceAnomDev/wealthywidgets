import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Status-coloured progress indicator with label positions, striped mode, and mount animation.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['right', 'top', 'inside'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 65 },
};

export const WithLabel: Story = {
  args: { value: 72, showLabel: true, labelPosition: 'right' },
};

export const WithTitle: Story = {
  args: { value: 88, title: 'Upload progress', showLabel: true, labelPosition: 'top' },
};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <ProgressBar value={90} status="danger"  title="Disk usage"  showLabel />
      <ProgressBar value={60} status="warning" title="Memory"      showLabel />
      <ProgressBar value={45} status="info"    title="Downloading" showLabel />
      <ProgressBar value={100} status="success" title="Backup"     showLabel />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <ProgressBar value={60} size="xs" title="XSmall" />
      <ProgressBar value={60} size="sm" title="Small" />
      <ProgressBar value={60} size="md" title="Medium" />
      <ProgressBar value={60} size="lg" title="Large" showLabel labelPosition="inside" />
    </div>
  ),
};

export const Striped: Story = {
  args: { value: 50, status: 'info', striped: true, showLabel: true, title: 'Processing…' },
};

export const Animated: Story = {
  args: { value: 75, animated: true, showLabel: true, title: 'Loading' },
  parameters: {
    docs: { description: { story: 'Fill animates from 0 on mount.' } },
  },
};

export const CustomLabel: Story = {
  args: {
    value: 340,
    max: 500,
    title: 'Storage',
    showLabel: true,
    labelPosition: 'right',
    formatLabel: (v: number, m: number) => `${v} MB / ${m} MB`,
  },
};
