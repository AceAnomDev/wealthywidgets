import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text field with label, icon, hint, validation states, and optional AI generation.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: ['default', 'error', 'success', 'warning'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com', type: 'email' },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    hint: 'Must be at least 8 characters',
    placeholder: '••••••••',
  },
};

export const Error: Story = {
  args: {
    label: 'Username',
    status: 'error',
    message: 'This username is already taken',
    defaultValue: 'john_doe',
  },
};

export const Success: Story = {
  args: {
    label: 'Username',
    status: 'success',
    message: 'Username is available!',
    defaultValue: 'cooluser_42',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search components…',
    leftIcon: <SearchIcon />,
  },
};

export const Required: Story = {
  args: { label: 'Full name', required: true, placeholder: 'Jane Smith' },
};

export const Disabled: Story = {
  args: { label: 'Account ID', value: 'ACC-00123', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: 'API Key', value: 'sk-ww-xxxxxxxxxxxx', readOnly: true },
};

export const FullWidth: Story = {
  args: { label: 'Full Width Input', placeholder: 'Stretches to container…', fullWidth: true },
  parameters: { layout: 'padded' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const AiGenerate: Story = {
  args: {
    label: 'Product Description',
    placeholder: 'Describe your product, or click ✦ to generate…',
    onAiGenerate: async (prompt: string) => {
      console.log('AI prompt:', prompt);
      await new Promise((r) => setTimeout(r, 1200));
      return 'A cutting-edge tool that transforms your workflow with intelligent automation.';
    },
  },
};
