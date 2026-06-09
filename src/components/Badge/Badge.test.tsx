import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Badge variant="danger">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('ww-badge--danger');
  });

  it('applies size class', () => {
    render(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('ww-badge--lg');
  });

  it('applies pill class', () => {
    render(<Badge pill>Pill</Badge>);
    expect(screen.getByText('Pill')).toHaveClass('ww-badge--pill');
  });

  it('renders dot indicator with count', () => {
    render(<Badge dot count={5}><span>Icon</span></Badge>);
    expect(screen.getByLabelText('5 notifications')).toBeInTheDocument();
  });

  it('caps count at max', () => {
    render(<Badge dot count={150} max={99}><span>Icon</span></Badge>);
    expect(screen.getByLabelText('99+ notifications')).toBeInTheDocument();
  });

  it('renders plain dot without count', () => {
    render(<Badge dot><span>Icon</span></Badge>);
    expect(screen.getByLabelText('Notification')).toBeInTheDocument();
  });
});
