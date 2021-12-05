import React, { useState } from 'react';
import Form from '../form/Form';
import DailyBookings from './DailyBookings';
import Filter from './Filter';
import useBookingsList from './useBookingsList';

const BookingsList = (): React.ReactElement => {
  const { filteredBookings, handleDelete, setFilter, handleSave } =
    useBookingsList();

  const [editMode, setEditMode] = useState<number | null>(null);

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
            onSave={handleSave}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ))}
      <Form onSave={handleSave} />
    </>
  );
};

export default BookingsList;
