import React, { useEffect, useState } from 'react';
import { loadBookings, selectFilteredBookings } from '../bookingsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import DailyBookings from './DailyBookings';
import Filter from './Filter';
import useBookingsList from './useBookingsList';

const BookingsList = (): React.ReactElement => {
  const filteredBookings = useAppSelector(selectFilteredBookings);

  const { handleDelete, setFilter, handleSave } = useBookingsList();

  const [editMode, setEditMode] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBookings());
  }, [dispatch]);

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
    </>
  );
};

export default BookingsList;
