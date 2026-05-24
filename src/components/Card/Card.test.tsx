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
    render(<Card description="Some description text" />);
    expect(screen.getByText('Some description text')).toBeInTheDocument();
  });

  it('renders image when imageSrc provided', () => {
    render(<Card imageSrc="/img.jpg" imageAlt="Alt text" />);
    expect(screen.getByAltText('Alt text')).toBeInTheDocument();
  });

  it('does not render image without imageSrc', () => {
    render(<Card title="No image" />);
    expect(document.querySelector('.ww-card__image')).not.toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(<Card actions={<button>Action</button>} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card><span>Child content</span></Card>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Card variant="elevated" />);
    expect(document.querySelector('.ww-card')).toHaveClass('ww-card--elevated');
  });

  it('applies clickable class', () => {
    render(<Card clickable />);
    expect(document.querySelector('.ww-card')).toHaveClass('ww-card--clickable');
  });
});
