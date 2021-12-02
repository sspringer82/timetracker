import { useContext, useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import { Booking } from './Booking';
import { BookingsProvider, BookingsContext } from './BookingsContext';

type TestProps = {
  value: Booking[];
};

function TestComponent({ value }: TestProps) {
  const { bookings, setBookings } = useContext(BookingsContext);
  useEffect(() => {
    setBookings(value);
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
          <TestComponent value={[testBooking]}></TestComponent>
        </BookingsProvider>,
      );
    });

    expect(screen.getByTestId('project')).toHaveTextContent('Breakfast');
  });

  it('should support and apply the filter', async () => {
    function TestComponent({ value }: { value: Booking[] }) {
      const { bookings, setBookings, setFilter } = useContext(BookingsContext);
      useEffect(() => {
        setBookings(value);
        setFilter('Din');
      }, []);

      return (
        <>
          {bookings.map((booking) => (
            <div data-testid="project" key={booking.id}>
              {booking.project}
            </div>
          ))}
        </>
      );
    }

    const testBooking: Booking[] = [
      {
        id: 1,
        start: 123,
        end: 345,
        project: 'Breakfast',
      },
      {
        id: 1,
        start: 123,
        end: 345,
        project: 'Dinner',
      },
    ];

    await act(async () => {
      render(
        <BookingsProvider>
          <TestComponent value={testBooking}></TestComponent>
        </BookingsProvider>,
      );
    });

    const projects = screen.getAllByTestId('project');
    expect(projects).toHaveLength(1);
    expect(projects[0]).toHaveTextContent('Dinner');
  });
});
