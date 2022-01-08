import { render, screen } from '@testing-library/react';
import { Booking } from '../Booking';
import DailyBookings from './DailyBookings';

describe('DailyBookings', () => {
  it('should show the two items and calculate the sum', () => {
    const bookings: Booking[] = [
      {
        id: 1,
        start: 1627798500000,
        end: 1627806600000,
        project: 'Frühstück',
      },
      {
        id: 2,
        start: 1627812000000,
        end: 1627815600000,
        project: 'Mittagessen',
      },
    ];

    render(<DailyBookings bookings={bookings} onDelete={jest.fn()} onSave={jest.fn()} editMode={null} setEditMode={jest.fn()} />);

    expect(screen.getByTestId('day')).toHaveTextContent('01.08.2021');
    expect(screen.getAllByTestId('project')).toHaveLength(2);
    expect(screen.getByTestId('sum')).toHaveTextContent('03:15');
  });
});
