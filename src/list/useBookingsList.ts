import { format } from 'date-fns';
import { useContext, useEffect } from 'react';
import { Booking } from '../Booking';
import { BookingsContext } from '../BookingsContext';

export default function useBookingsList() {
  const { bookings, setBookings, setFilter } = useContext(BookingsContext);

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

  return {
    handleDelete,
    filteredBookings,
    setFilter,
  };
}
