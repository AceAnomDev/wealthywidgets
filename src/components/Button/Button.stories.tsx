import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive element with 6 variants, 5 sizes, icons, loading state, and pill shape.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Get Started' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Learn More' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'View Details' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete Account' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Confirm' },
};

export const Loading: Story = {
  args: { variant: 'primary', children: 'Saving…', loading: true },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Unavailable', disabled: true },
};

export const Rounded: Story = {
  args: { variant: 'primary', children: 'Pill Button', rounded: true },
};

export const FullWidth: Story = {
  args: { variant: 'primary', children: 'Full Width', fullWidth: true },
  parameters: { layout: 'padded' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  ),
};
