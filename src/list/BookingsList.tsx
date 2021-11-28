import React from 'react';
import DailyBookings from './DailyBookings';
import useBookingsList from './useBookingsList';

const BookingsList = (): React.ReactElement => {
  const { filteredBookings, handleDelete } = useBookingsList();

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
