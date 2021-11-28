import { differenceInMilliseconds, addMilliseconds, parseISO } from 'date-fns';
import { Booking } from '../Booking';

export default function sumBookings(bookings: Booking[]): Date {
  const diffInMS = bookings
    .map((booking) => {
      return differenceInMilliseconds(booking.end, booking.start);
    })
    .reduce((prev, curr) => prev + curr, 0);
  const sum = addMilliseconds(parseISO('2021-01-01'), diffInMS);
  return sum;
}
