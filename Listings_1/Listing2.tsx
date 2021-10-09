import { render, screen } from '@testing-library/react';
import { Booking } from '../Booking';
import BookingItem from './BookingItem';

describe('BookingItem', () => {
  it('should show a single Item', () => {
    const booking: Booking = {
      id: 1,
      start: 1627798500000,
      end: 1627806600000,
      project: 'Frühstück',
    };

    render(<BookingItem booking={booking} />);

    expect(screen.getByTestId('date')).toHaveTextContent('01.08.2021');
    expect(screen.getByTestId('start')).toHaveTextContent('08:15');
    expect(screen.getByTestId('end')).toHaveTextContent('10:30');
    expect(screen.getByTestId('project')).toHaveTextContent('Frühstück');
  });
});
