import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { Booking } from '../Booking';
import DailyBookings from './DailyBookings';

const BookingsList = (): React.ReactElement => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/bookings')
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  const filteredBookings: Record<string, Booking[]> = {};
  bookings.forEach((booking) => {
    const date = format(booking.start, 'yyyy-MM-dd');
    if (filteredBookings[date]) {
      filteredBookings[date].push(booking);
    } else {
      filteredBookings[date] = [booking];
    }
  });

  async function handleDelete(id: number) {
    await fetch(`http://localhost:3001/bookings/${id}`, { method: 'delete' });
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
