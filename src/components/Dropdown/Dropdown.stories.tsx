import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';

const frameworkOptions = [
  { value: 'react',   label: 'React',   description: 'UI library by Meta' },
  { value: 'vue',     label: 'Vue',     description: 'Progressive framework' },
  { value: 'svelte',  label: 'Svelte',  description: 'Compiler-based framework' },
  { value: 'angular', label: 'Angular', description: 'Platform by Google' },
  { value: 'solid',   label: 'SolidJS', description: 'Fine-grained reactivity' },
];

const languageOptions = [
  { value: 'ts',  label: 'TypeScript' },
  { value: 'js',  label: 'JavaScript' },
  { value: 'py',  label: 'Python' },
  { value: 'rs',  label: 'Rust' },
  { value: 'go',  label: 'Go' },
  { value: 'cpp', label: 'C++', disabled: true },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Single and multi-select dropdown with optional search, descriptions, and keyboard navigation.',
      },
    },
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

function SingleStory() {
  const [val, setVal] = useState('');
  return (
    <Dropdown
      label="Framework"
      options={frameworkOptions}
      value={val}
      onChange={(v) => setVal(v as string)}
      placeholder="Choose a framework…"
    />
  );
}

function WithSearchStory() {
  const [val, setVal] = useState('');
  return (
    <Dropdown
      label="Language"
      options={languageOptions}
      value={val}
      onChange={(v) => setVal(v as string)}
      searchable
      placeholder="Search languages…"
    />
  );
}

function MultiSelectStory() {
  const [vals, setVals] = useState<string[]>([]);
  return (
    <Dropdown
      label="Frameworks"
      options={frameworkOptions}
      value={vals}
      onChange={(v) => setVals(v as string[])}
      multiple
      searchable
      placeholder="Select frameworks…"
    />
  );
}

function WithDisabledOptionsStory() {
  const [val, setVal] = useState('');
  return (
    <Dropdown
      label="Language"
      options={languageOptions}
      value={val}
      onChange={(v) => setVal(v as string)}
      placeholder="Pick a language…"
    />
  );
}

export const Single: Story = {
  render: () => <SingleStory />,
};

export const WithSearch: Story = {
  render: () => <WithSearchStory />,
};

export const MultiSelect: Story = {
  render: () => <MultiSelectStory />,
};

export const WithDisabledOptions: Story = {
  render: () => <WithDisabledOptionsStory />,
  parameters: {
    docs: { description: { story: 'C++ is disabled and cannot be selected.' } },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    options: frameworkOptions,
    placeholder: 'Not available',
    disabled: true,
  },
};

function FullWidthStory() {
  const [val, setVal] = useState('');
  return (
    <Dropdown
      label="Full Width"
      options={frameworkOptions}
      value={val}
      onChange={(v) => setVal(v as string)}
      fullWidth
      placeholder="Choose…"
    />
  );
}

export const FullWidth: Story = {
  render: () => <FullWidthStory />,
  parameters: { layout: 'padded' },
};
