import { format } from 'date-fns';
import React from 'react';
import { Booking } from '../Booking';

type Props = {
  booking: Booking;
};

const BookingItem = ({ booking }: Props): React.ReactElement => {
  return (
    <div style={{ display: 'flex' }}>
      <div data-testid="date">{format(booking.start, 'dd.MM.yyyy')}</div>
      <div data-testid="start">{format(booking.start, 'HH:mm')}</div>
      <div data-testid="end">{format(booking.end, 'HH:mm')}</div>
      <div data-testid="project">{booking.project}</div>
    </div>
  );
};

export default BookingItem;
