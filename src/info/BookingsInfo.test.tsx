import { useContext, useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import { Booking } from '../Booking';
import { BookingsContext, BookingsProvider } from '../BookingsContext';
import BookingsInfo from './BookingsInfo';

type TestProps = {
  value: Booking[];
};

function TestComponent({ value }: TestProps) {
  const [bookings, setBookings] = useContext(BookingsContext);
  useEffect(() => {
    setBookings(value);
  }, []);

  return <></>;
}
describe('BookingsInfo', () => {
  it('should display the sum of all bookings', async () => {
    const bookings = [
      {
        id: 1,
        start: 1627884000000,
        end: 1627889400000,
        project: 'Frühstück',
      },
      {
        id: 2,
        start: 1627797600000,
        end: 1627801200000,
        project: 'Frühstück',
      },
      {
        id: 3,
        start: 1627812000000,
        end: 1627815600000,
        project: 'Mittagessen',
      },
    ];

    await act(async () => {
      render(
        <BookingsProvider>
          <TestComponent value={bookings}></TestComponent>
          <BookingsInfo></BookingsInfo>
        </BookingsProvider>,
      );
    });

    expect(screen.getByTestId('sum')).toHaveTextContent('03:30');
  });
});
