import { useContext, useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import { Booking } from './Booking';
import { BookingsProvider, BookingsContext } from './BookingsContext';

type TestProps = {
  value: Booking;
};

function TestComponent({ value }: TestProps) {
  const [bookings, setBookings] = useContext(BookingsContext);
  useEffect(() => {
    setBookings([value]);
  }, []);

  return <div data-testid="project">{bookings[0]?.project}</div>;
}
describe('BookingsContext', () => {
  it('should provide a context for bookings', async () => {
    const testBooking: Booking = {
      id: 1,
      start: 123,
      end: 345,
      project: 'Breakfast',
    };
    await act(async () => {
      render(
        <BookingsProvider>
          <TestComponent value={testBooking}></TestComponent>
        </BookingsProvider>,
      );
    });

    expect(screen.getByTestId('project')).toHaveTextContent('Breakfast');
  });
});
