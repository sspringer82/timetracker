import { format } from 'date-fns';
import { ReactElement, useContext } from 'react';
import { BookingsContext } from '../BookingsContext';
import sumBookings from '../util/sumBookings';

const BookingsInfo = (): ReactElement => {
  const { bookings } = useContext(BookingsContext);

  const sum = sumBookings(bookings);

  return (
    <div>
      Summe: <span data-testid="sum">{format(sum, 'HH:mm')}</span>
    </div>
  );
};

export default BookingsInfo;
