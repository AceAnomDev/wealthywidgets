import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';

jest.useFakeTimers();

function Trigger({ variant }: { variant?: import('./Toast.types').ToastVariant }) {
  const { toast, dismissAll } = useToast();
  return (
    <>
      <button onClick={() => toast({ message: 'Hello', variant, title: 'Notice' })}>
        Show
      </button>
      <button onClick={dismissAll}>Clear all</button>
    </>
  );
}

function Wrapper({ variant }: { variant?: import('./Toast.types').ToastVariant }) {
  return (
    <ToastProvider>
      <Trigger variant={variant} />
    </ToastProvider>
  );
}

describe('Toast / ToastProvider', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders a toast when triggered', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Notice')).toBeInTheDocument();
  });

  it('dismisses on close button click', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByText('Show'));
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    act(() => jest.advanceTimersByTime(300));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    render(<ToastProvider defaultDuration={2000}><Trigger /></ToastProvider>);
    fireEvent.click(screen.getByText('Show'));
    act(() => jest.advanceTimersByTime(2000));
    act(() => jest.advanceTimersByTime(300)); // exit animation
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('dismissAll removes all toasts', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByText('Show'));
    fireEvent.click(screen.getByText('Show'));
    fireEvent.click(screen.getByText('Clear all'));
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });

  it('throws when useToast is used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    function Bad() { useToast(); return null; }
    expect(() => render(<Bad />)).toThrow('useToast must be used inside <ToastProvider>');
    spy.mockRestore();
  });
});
