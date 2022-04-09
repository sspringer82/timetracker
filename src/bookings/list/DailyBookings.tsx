import { format, getHours, getMinutes } from 'date-fns';
import React from 'react';
import { Booking, InputBooking } from '../Booking';
import sumBookings from '../util/sumBookings';
import BookingItem from './BookingItem/BookingItem';

type Props = {
  bookings: Booking[];
  onDelete: (id: number) => void;
  onSave: (booking: InputBooking) => Promise<void>;
  editMode: number | null;
  setEditMode: (id: number | null) => void;
};

const DailyBookings = ({
  bookings,
  onDelete,
  onSave,
  editMode,
  setEditMode,
}: Props): React.ReactElement => {
  const sum = sumBookings(bookings);
  const hours = getHours(sum);
  const minutes = getMinutes(sum);
  let color = 'green';
  if (hours > 8 || hours < 7) {
    color = 'red';
  } else if ((hours === 8 && minutes > 30) || (hours < 8 && minutes < 30)) {
    color = 'orange';
  }
  return (
    <div>
      <h1 data-testid="day">
        {bookings[0] &&
          bookings[0].start &&
          format(bookings[0].start, 'dd.MM.yyyy')}
      </h1>
      {bookings.map((booking) => (
        <BookingItem
          onDelete={onDelete}
          booking={booking}
          key={booking.id}
          onSave={onSave}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ))}
      <div data-testid="daily-sum" style={{ fontWeight: 'bold', color }}>
        Summe: <span data-testid="sum">{format(sum, 'HH:mm')}</span>
      </div>
    </div>
  );
};

export default DailyBookings;
