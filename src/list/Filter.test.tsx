import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  it('should show the filter form', () => {
    render(<Filter onFilter={jest.fn} />);

    expect(screen.getByTestId('filter-input')).toBeInTheDocument();
    expect(screen.getByTestId('filter-submit')).toBeInTheDocument();
  });

  it('should correctly submit the filter value', () => {
    const onFilter = jest.fn();
    render(<Filter onFilter={onFilter} />);

    const input = screen.getByTestId('filter-input');
    const submit = screen.getByTestId('filter-submit');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(submit);

    expect(onFilter).toHaveBeenCalledWith('search term');
  });
});
