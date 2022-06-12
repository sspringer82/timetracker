import { format } from 'date-fns';
import { useContext } from 'react';
import { Booking, InputBooking } from '../Booking';
import { BookingsContext } from '../BookingsContext';

export default function useBookingsList() {
  const { bookings, setBookings, setFilter } = useContext(BookingsContext);
  /*
  useEffect(() => {
    fetch('http://localhost:3001/bookings')
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);
*/
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

  async function handleSave(booking: InputBooking): Promise<void> {
    let method = 'POST';
    let url = 'http://localhost:3001/bookings';
    if (booking.id) {
      method = 'PUT';
      url = `${url}/${booking.id}`;
    }

    const response = await fetch(url, {
      method,
      body: JSON.stringify(booking),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      setBookings((prevBookings) => {
        if (booking.id) {
          return prevBookings.map((booking) => {
            if (booking.id === data.id) {
              return data;
            }
            return booking;
          });
        }
        return [...prevBookings, data];
      });
    }
  }

  return {
    handleDelete,
    filteredBookings,
    setFilter,
    handleSave,
  };
}
