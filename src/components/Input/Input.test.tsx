import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('renders hint', () => {
    render(<Input hint="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders error message with alert role', () => {
    render(<Input status="error" message="Required field" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('links label to input via htmlFor', () => {
    render(<Input label="Name" />);
    const label = screen.getByText('Name');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('is aria-invalid when status is error', () => {
    render(<Input status="error" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows required asterisk', () => {
    render(<Input label="Email" required />);
    expect(document.querySelector('.ww-input__label-required')).toBeInTheDocument();
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
