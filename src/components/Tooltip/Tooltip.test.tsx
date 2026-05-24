import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './Tooltip';

jest.useFakeTimers();

describe('Tooltip', () => {
  it('does not show tooltip initially', () => {
    render(<Tooltip content="Hint"><button>Hover</button></Tooltip>);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip after delay on mouseenter', () => {
    render(<Tooltip content="Hint" showDelay={300}><button>Hover</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover').parentElement!);
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Hint')).toBeInTheDocument();
  });

  it('hides tooltip after mouseleave', () => {
    render(<Tooltip content="Hint" showDelay={0} hideDelay={100}><button>Hover</button></Tooltip>);
    const wrapper = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => jest.advanceTimersByTime(0));
    fireEvent.mouseLeave(wrapper);
    act(() => jest.advanceTimersByTime(100));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show when disabled', () => {
    render(<Tooltip content="Hint" disabled><button>Hover</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover').parentElement!);
    act(() => jest.advanceTimersByTime(300));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies placement class', () => {
    render(<Tooltip content="Hint" placement="bottom" showDelay={0}><span>T</span></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('T').parentElement!);
    act(() => jest.advanceTimersByTime(0));
    expect(document.querySelector('.ww-tooltip__bubble--bottom')).toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(<Tooltip content="Focus hint" showDelay={0}><button>Focus</button></Tooltip>);
    fireEvent.focus(screen.getByText('Focus').parentElement!);
    act(() => jest.advanceTimersByTime(0));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
