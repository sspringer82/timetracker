import React from 'react';
import DailyBookings from './DailyBookings';
import Filter from './Filter';
import useBookingsList from './useBookingsList';

const BookingsList = (): React.ReactElement => {
  const { filteredBookings, handleDelete, setFilter } = useBookingsList();

  return (
    <>
      <Filter onFilter={setFilter} />
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
