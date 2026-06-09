import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hover/focus hint with 4 placements, 2 variants, configurable delays, and rich content support.',
      },
    },
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    variant: { control: 'select', options: ['dark', 'light'] },
    showDelay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    hideDelay: { control: { type: 'range', min: 0, max: 500, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 60 }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const LightVariant: Story = {
  args: {
    content: 'Light theme tooltip',
    variant: 'light',
    children: <Button variant="outline">Light tooltip</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <span>
        <strong>Shortcut:</strong> ⌘S
      </span>
    ),
    placement: 'right',
    children: <Button>Save</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'You will not see this',
    disabled: true,
    children: <Button variant="ghost">Disabled tooltip</Button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: 'Instant tooltip',
    showDelay: 0,
    hideDelay: 0,
    children: <Button variant="secondary">No delay</Button>,
  },
};
