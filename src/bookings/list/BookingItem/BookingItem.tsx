import './BookingItem.scss';
import { format } from 'date-fns';
import React from 'react';
import { Booking, InputBooking } from '../../Booking';
import Form from '../../form/Form';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { removeBooking } from '../../bookingsSlice';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  if (editMode === booking.id) {
    return (
      <Form
        onSave={async (booking: InputBooking) => {
          setEditMode(null);
        }}
        booking={booking}
      />
    );
  } else {
    return (
      <div className="BookingItem">
        <div className="data">
          <div data-testid="date">{format(booking.start, 'dd.MM.yyyy')}</div>
          <div data-testid="start">{format(booking.start, 'HH:mm')}</div>
          <div data-testid="end">{format(booking.end, 'HH:mm')}</div>
          <div data-testid="project">{booking.project}</div>
        </div>
        <div className="buttons">
          <Button
            data-testid="delete-button"
            onClick={() => dispatch(removeBooking(booking.id))}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            {t('btn-title-delete')}
          </Button>
          <Button
            data-testid={`edit-button-${booking.id}`}
            onClick={() => setEditMode(booking.id)}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            {t('btn-title-edit')}
          </Button>
          <Link
            to={`/edit/${booking.id}`}
            data-testid={`edit-link-${booking.id}`}
          >
            bearbeiten
          </Link>
          <Link to={`/${booking.id}`} data-testid={`open-link-${booking.id}`}>
            in dialog bearbeiten
          </Link>
        </div>
      </div>
    );
  }
};

export default BookingItem;
