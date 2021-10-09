import {
  differenceInMilliseconds,
  format,
  addMilliseconds,
  parseISO,
} from 'date-fns';
import React from 'react';
import { Booking } from '../Booking';
import BookingItem from './BookingItem';

type Props = {
  bookings: Booking[];
  onDelete: (id: number) => void;
};

const DailyBookings = ({ bookings, onDelete }: Props): React.ReactElement => {
  const diffInMS = bookings
    .map((booking) => {
      return differenceInMilliseconds(booking.end, booking.start);
    })
    .reduce((prev, curr) => prev + curr, 0);
  const sum = addMilliseconds(parseISO('2021-01-01'), diffInMS);

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
