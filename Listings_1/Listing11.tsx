import format from 'date-fns/format';
import React, { useState } from 'react';
import { Booking } from '../Booking';
import DailyBookings from './DailyBookings';

const initialBookings: Booking[] = [
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

const BookingsList = (): React.ReactElement => {
  const [bookings, setBookings] = useState(initialBookings);

  const filteredBookings: Record<string, Booking[]> = {};
  bookings.forEach((booking) => {
    const date = format(booking.start, 'yyyy-MM-dd');
    if (filteredBookings[date]) {
      filteredBookings[date].push(booking);
    } else {
      filteredBookings[date] = [booking];
    }
  });

  function handleDelete(id: number) {
    setBookings((prevBookings) => {
      return prevBookings.filter((booking) => booking.id !== id);
    });
  }

  return (
    <>
      {Object.keys(filteredBookings)
        .sort()
        .map((date) => (
          <DailyBookings
            bookings={filteredBookings[date]}
            key={date}
            onDelete={handleDelete}
          />
        ))}
    </>
  );
};

export default BookingsList;
