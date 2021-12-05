import { format } from 'date-fns';
import React from 'react';
import { Booking, InputBooking } from '../Booking';
import Form from '../form/Form';
import useBookingsList from './useBookingsList';

type Props = {
  booking: Booking;
  onDelete: (id: number) => void;
  onSave: (booking: InputBooking) => Promise<void>;
  editMode: number | null;
  setEditMode: (id: number | null) => void;
};

const BookingItem = ({
  booking,
  onDelete,
  onSave,
  editMode,
  setEditMode,
}: Props): React.ReactElement => {
  if (editMode === booking.id) {
    return (
      <Form
        onSave={async (booking: InputBooking) => {
          await onSave(booking);
          setEditMode(null);
        }}
        booking={booking}
      />
    );
  } else {
    return (
      <div style={{ display: 'flex' }}>
        <div data-testid="date">{format(booking.start, 'dd.MM.yyyy')}</div>
        <div data-testid="start">{format(booking.start, 'HH:mm')}</div>
        <div data-testid="end">{format(booking.end, 'HH:mm')}</div>
        <div data-testid="project">{booking.project}</div>
        <button
          data-testid="delete-button"
          onClick={() => onDelete(booking.id)}
        >
          löschen
        </button>
        <button
          data-testid={`edit-button-${booking.id}`}
          onClick={() => setEditMode(booking.id)}
        >
          bearbeiten
        </button>
      </div>
    );
  }
};

export default BookingItem;
