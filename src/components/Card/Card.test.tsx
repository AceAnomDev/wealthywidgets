import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title', () => {
    render(<Card title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<Card title="T" subtitle="Sub" />);
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Card description="A description" />);
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card><span>Child</span></Card>);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<Card actions={<button>Go</button>} />);
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Card variant="elevated" />);
    expect(container.firstChild).toHaveClass('ww-card--elevated');
  });

  it('applies clickable class', () => {
    const { container } = render(<Card clickable />);
    expect(container.firstChild).toHaveClass('ww-card--clickable');
  });

  it('renders image with correct src and alt', () => {
    render(<Card imageSrc="/img.jpg" imageAlt="A photo" />);
    const img = screen.getByAltText('A photo');
    expect(img).toHaveAttribute('src', '/img.jpg');
  });

  // NEW: aspect ratio CSS class must use dash not backslash
  it('generates valid dash-separated aspect-ratio class', () => {
    const { container } = render(<Card imageSrc="/img.jpg" imageAspectRatio="16/9" />);
    expect(container.querySelector('.ww-card__image-wrapper--16-9')).toBeInTheDocument();
    expect(container.querySelector('.ww-card__image-wrapper--16\\/9')).not.toBeInTheDocument();
  });

  it('applies noPadding class', () => {
    const { container } = render(<Card noPadding />);
    expect(container.querySelector('.ww-card__body--no-padding')).toBeInTheDocument();
  });
});
