import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact label for status, category, or count. Supports dot indicator mode for notification counts.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Default', variant: 'default' },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="primary" pill>New</Badge>
      <Badge variant="success" pill>Active</Badge>
      <Badge variant="danger" pill>Critical</Badge>
      <Badge variant="warning" pill>Beta</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
    </div>
  ),
};

export const DotIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Badge dot count={3}><BellIcon /></Badge>
      <Badge dot count={12}><BellIcon /></Badge>
      <Badge dot count={150} max={99}><BellIcon /></Badge>
      <Badge dot><BellIcon /></Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
      {[
        { label: 'Feature Request', badge: <Badge variant="info" size="sm">Open</Badge> },
        { label: 'Critical Bug',    badge: <Badge variant="danger" size="sm" pill>Critical</Badge> },
        { label: 'Dark Mode',       badge: <Badge variant="success" size="sm">Done</Badge> },
        { label: 'API v2',          badge: <Badge variant="warning" size="sm">In Progress</Badge> },
      ].map(({ label, badge }) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <span style={{ fontSize: 14 }}>{label}</span>
          {badge}
        </div>
      ))}
    </div>
  ),
};
