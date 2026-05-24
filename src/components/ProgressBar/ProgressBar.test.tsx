import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders progressbar role', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow', () => {
    render(<ProgressBar value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('clamps value to 0–max', () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps negative value to 0', () => {
    render(<ProgressBar value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows label when showLabel=true and labelPosition=right', () => {
    render(<ProgressBar value={75} showLabel labelPosition="right" />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ProgressBar value={30} title="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('applies status class to fill', () => {
    render(<ProgressBar value={50} status="danger" />);
    expect(document.querySelector('.ww-progress__fill--danger')).toBeInTheDocument();
  });

  it('uses custom label format', () => {
    render(<ProgressBar value={40} max={200} showLabel formatLabel={(v, m) => `${v}/${m}`} labelPosition="right" />);
    expect(screen.getByText('40/200')).toBeInTheDocument();
  });
});
