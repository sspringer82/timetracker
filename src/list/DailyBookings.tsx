import { format } from 'date-fns';
import React from 'react';
import { Booking } from '../Booking';
import sumBookings from '../util/sumBookings';
import BookingItem from './BookingItem';

type Props = {
  bookings: Booking[];
  onDelete: (id: number) => void;
};

const DailyBookings = ({ bookings, onDelete }: Props): React.ReactElement => {
  const sum = sumBookings(bookings);
  return (
    <div>
      <h1 data-testid="day">
        {bookings[0] &&
          bookings[0].start &&
          format(bookings[0].start, 'dd.MM.yyyy')}
      </h1>
      {bookings.map((booking) => (
        <BookingItem onDelete={onDelete} booking={booking} key={booking.id} />
      ))}
      <div>
        Summe: <span data-testid="sum">{format(sum, 'HH:mm')}</span>
      </div>
    </div>
  );
};

export default DailyBookings;
