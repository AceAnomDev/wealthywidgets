import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('is not aria-invalid when status is success', () => {
    render(<Input status="success" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('shows required asterisk', () => {
    render(<Input label="Email" required />);
    expect(document.querySelector('.ww-input__label-required')).toBeInTheDocument();
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders right element', () => {
    render(<Input rightElement={<span data-testid="right" />} />);
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('is readOnly when readOnly prop is set', () => {
    render(<Input readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).toHaveClass('ww-input--full-width');
  });

  it('links hint to input via aria-describedby', () => {
    render(<Input hint="Use 8+ characters" />);
    const input = screen.getByRole('textbox');
    const hint = screen.getByText('Use 8+ characters');
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('links message to input via aria-describedby', () => {
    render(<Input message="Invalid email" status="error" />);
    const input = screen.getByRole('textbox');
    const msg = screen.getByRole('alert');
    expect(input.getAttribute('aria-describedby')).toContain(msg.id);
  });

  it('shows AI generate button when onAiGenerate is provided', () => {
    render(<Input onAiGenerate={() => Promise.resolve('result')} />);
    expect(screen.getByLabelText('Generate with AI')).toBeInTheDocument();
  });

  it('calls onAiGenerate and fires onChange with the result', async () => {
    const onAiGenerate = jest.fn().mockResolvedValue('generated text');
    const onChange = jest.fn();
    render(
      <Input
        value="prompt"
        onAiGenerate={onAiGenerate}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText('Generate with AI'));
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const event = (onChange.mock.calls as [React.ChangeEvent<HTMLInputElement>][])[0][0];
    expect(event.target.value).toBe('generated text');
  });
});
