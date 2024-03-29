import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Booking } from '../../Booking';
import BookingItem from './BookingItem';

describe('BookingItem', () => {
  const booking: Booking = {
    id: 1,
    start: 1627798500000,
    end: 1627806600000,
    project: 'Frühstück',
  };
  it('should show a single Item', () => {
    render(
      <MemoryRouter>
        <BookingItem
          booking={booking}
          onDelete={jest.fn()}
          onSave={jest.fn()}
          editMode={null}
          setEditMode={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('date')).toHaveTextContent('01.08.2021');
    expect(screen.getByTestId('start')).toHaveTextContent('08:15');
    expect(screen.getByTestId('end')).toHaveTextContent('10:30');
    expect(screen.getByTestId('project')).toHaveTextContent('Frühstück');
  });

  it('should be possible to delete an item', () => {
    const handleDelete = jest.fn();

    render(
      <MemoryRouter>
        <BookingItem
          booking={booking}
          onDelete={handleDelete}
          onSave={jest.fn()}
          editMode={null}
          setEditMode={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('delete-button'));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
