import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Flexible content container with optional image, title, description, and action slots.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined'] },
    imageAspectRatio: { control: 'select', options: ['16/9', '4/3', '1/1', '3/2'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Getting Started',
    subtitle: 'Documentation',
    description: 'Learn how to install and use WealthyWidgets in your React application in under 5 minutes.',
    actions: <Button size="sm">Read more</Button>,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mountain Sunrise',
    subtitle: 'Photography',
    imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    imageAlt: 'Mountain sunrise',
    description: 'Golden hour light painting the peaks in warm amber tones.',
    actions: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" variant="outline">Save</Button>
        <Button size="sm">View</Button>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Premium Plan',
    subtitle: '$49 / month',
    description: 'Unlimited projects, priority support, and advanced analytics.',
    actions: <Button fullWidth>Upgrade Now</Button>,
    headerExtra: <Badge variant="primary" pill size="sm">Popular</Badge>,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'API Reference',
    description: 'Complete TypeScript definitions and usage examples for every component.',
    actions: <Button variant="outline" size="sm">Open Docs</Button>,
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    title: 'Click me',
    description: 'This entire card is interactive.',
    clickable: true,
  },
};

export const NoPadding: Story = {
  args: {
    imageSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    imageAlt: 'Night sky',
    noPadding: true,
  },
};
