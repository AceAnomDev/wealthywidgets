import { render, screen, fireEvent, act } from '@testing-library/react';
import { Modal } from './Modal';

jest.useFakeTimers();

const defaultProps = { isOpen: true, onClose: jest.fn() };

describe('Modal', () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllTimers());

  it('renders when open', () => {
    render(<Modal {...defaultProps} title="Hello">Content</Modal>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal isOpen={false} onClose={jest.fn()} title="Hidden" />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose} title="T" />);
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose} title="T" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer', () => {
    render(<Modal {...defaultProps} footer={<button>OK</button>} />);
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('hides close button when hideCloseButton', () => {
    render(<Modal {...defaultProps} hideCloseButton title="T" />);
    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('applies correct size class', () => {
    render(<Modal {...defaultProps} size="lg" />);
    expect(document.querySelector('.ww-modal__panel--lg')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Modal {...defaultProps} title="T" description="Subtitle here" />);
    expect(screen.getByText('Subtitle here')).toBeInTheDocument();
  });

  // NEW: role="dialog" must be on the panel, not the backdrop
  it('dialog role is on the panel element, not the backdrop', () => {
    render(<Modal {...defaultProps} title="T" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('ww-modal__panel');
    expect(dialog).not.toHaveClass('ww-modal__backdrop');
  });

  // NEW: focus management
  it('moves focus into the dialog when opened', () => {
    render(<Modal isOpen onClose={jest.fn()} title="T" />);
    // flush requestAnimationFrame in jsdom
    act(() => { jest.runAllTimers(); });
    const dialog = document.querySelector('.ww-modal__panel') as HTMLElement;
    expect(document.activeElement === dialog || dialog.contains(document.activeElement)).toBe(true);
  });
});
