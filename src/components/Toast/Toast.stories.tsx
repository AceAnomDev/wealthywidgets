import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';
import type { ToastVariant, ToastPosition } from './Toast.types';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'App-wide notification system. Wrap your app with `<ToastProvider>` and trigger toasts via `useToast()` hook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const VARIANTS: ToastVariant[] = ['default', 'success', 'warning', 'danger', 'info'];
const POSITIONS: ToastPosition[] = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];

function ToastDemo({ position = 'top-right' as ToastPosition }) {
  const { toast, dismissAll } = useToast();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {VARIANTS.map((v) => (
          <Button
            key={v}
            size="sm"
            variant={v === 'danger' ? 'danger' : v === 'success' ? 'success' : 'outline'}
            onClick={() => toast({
              variant: v,
              title: v.charAt(0).toUpperCase() + v.slice(1),
              message: `This is a ${v} notification.`,
            })}
          >
            {v}
          </Button>
        ))}
      </div>
      <Button size="sm" variant="ghost" onClick={dismissAll}>Dismiss all</Button>
      <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Position: {position}</p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo position="top-right" />
    </ToastProvider>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {POSITIONS.map((pos) => (
        <ToastProvider key={pos} position={pos}>
          <ToastDemo position={pos} />
        </ToastProvider>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Each row uses a different screen position.' } },
  },
};

function WithTitleDemo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({
      variant: 'success',
      title: 'Changes saved',
      message: 'Your profile has been updated successfully.',
      duration: 5000,
    })}>
      Show with title
    </Button>
  );
}

export const WithTitle: Story = {
  render: () => (
    <ToastProvider>
      <WithTitleDemo />
    </ToastProvider>
  ),
};

function PersistentDemo() {
  const { toast, dismissAll } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        variant="danger"
        onClick={() => toast({
          variant: 'danger',
          title: 'Connection lost',
          message: 'Reconnecting to server…',
          duration: 0,
        })}
      >
        Show persistent
      </Button>
      <Button variant="ghost" onClick={dismissAll}>Dismiss all</Button>
    </div>
  );
}

export const Persistent: Story = {
  render: () => (
    <ToastProvider>
      <PersistentDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: { description: { story: '`duration: 0` — stays on screen until manually dismissed.' } },
  },
};
