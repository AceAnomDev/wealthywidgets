import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible dialog with focus management, Escape key, backdrop click, and Portal rendering.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="This will permanently delete your data."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
        {...props}
      >
        <p style={{ margin: 0, color: '#374151' }}>
          Are you sure you want to delete <strong>Project Alpha</strong>?
          This action cannot be undone and all associated data will be lost.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const NoBackdropClose: Story = {
  render: () => <ModalDemo disableBackdropClose />,
  parameters: {
    docs: { description: { story: 'Clicking outside the modal does not close it.' } },
  },
};

export const NoCloseButton: Story = {
  render: () => <ModalDemo hideCloseButton />,
};

function ContentOnlyStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 8 }}>
          <h3 style={{ margin: '0 0 12px' }}>Custom Content</h3>
          <p style={{ margin: '0 0 16px', color: '#6b7280' }}>
            Modal without title prop — header is hidden automatically.
          </p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
}

export const ContentOnly: Story = {
  render: () => <ContentOnlyStory />,
};
