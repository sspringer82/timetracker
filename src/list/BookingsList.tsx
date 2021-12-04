import React from 'react';
import Form from '../form/Form';
import DailyBookings from './DailyBookings';
import Filter from './Filter';
import useBookingsList from './useBookingsList';

const BookingsList = (): React.ReactElement => {
  const { filteredBookings, handleDelete, setFilter, handleSave } =
    useBookingsList();

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
      <Form onSave={handleSave} />
    </>
  );
};

export default BookingsList;
