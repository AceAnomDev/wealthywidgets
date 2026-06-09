import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

describe('Dropdown', () => {
  it('renders placeholder', () => {
    render(<Dropdown options={options} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('opens menu on click', () => {
    render(<Dropdown options={options} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows all options when open', () => {
    render(<Dropdown options={options} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('calls onChange on single select', () => {
    const onChange = jest.fn();
    render(<Dropdown options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('closes after single select', () => {
    render(<Dropdown options={options} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Beta'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('multi-select keeps menu open', () => {
    render(<Dropdown options={options} multiple value={[]} onChange={jest.fn()} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Alpha'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders search field when searchable', () => {
    render(<Dropdown options={options} searchable />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('filters options by search query', () => {
    render(<Dropdown options={options} searchable />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'alp' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('shows emptyMessage when no results', () => {
    render(<Dropdown options={options} searchable emptyMessage="Nothing found" />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'zzz' } });
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('is disabled', () => {
    render(<Dropdown options={options} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // NEW: tag-remove must be keyboard accessible
  it('tag-remove has tabIndex and keyboard handler', () => {
    render(
      <Dropdown
        options={options}
        multiple
        value={['a', 'b']}
        onChange={jest.fn()}
      />,
    );
    const removeButtons = screen.getAllByRole('button', { name: /Remove/ });
    expect(removeButtons.length).toBeGreaterThan(0);
    removeButtons.forEach((btn) => {
      expect(btn).toHaveAttribute('tabindex', '0');
    });
  });

  it('removes tag on Enter key', () => {
    const onChange = jest.fn();
    render(
      <Dropdown
        options={options}
        multiple
        value={['a', 'b']}
        onChange={onChange}
      />,
    );
    const removeAlpha = screen.getByLabelText('Remove Alpha');
    fireEvent.keyDown(removeAlpha, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['b']);
  });
});
