import {
  Formik,
  Form as FormikForm,
  Field,
  FormikHelpers,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ReactElement, useContext } from 'react';
import { Booking, InputBooking } from '../Booking';
import { BookingsContext } from '../BookingsContext';
import { useAppDispatch } from '../../hooks';
import { saveBooking } from '../bookingsSlice';

type Props = {
  booking?: Booking;
  onSave: (booking: InputBooking) => void;
};

type FormValues = {
  start: string;
  end: string;
  project: string;
};

const initialBooking: FormValues = {
  start: '',
  end: '',
  project: '',
};

const validationSchema = Yup.object().shape({
  start: Yup.date().required('Start ist ein Pflichtfeld'),
  end: Yup.date()
    .min(Yup.ref('start'), 'Ende darf nicht vor Start liegen')
    .required('Ende ist ein Pflichtfeld'),
  project: Yup.string().required('Projekt ist ein Pflichtfeld'),
});

function getInitialValues(booking?: Booking): FormValues {
  if (booking) {
    return {
      start: format(booking.start, "yyyy-MM-dd'T'HH:mm"),
      end: format(booking.end, "yyyy-MM-dd'T'HH:mm"),
      project: booking.project,
    };
  }
  return initialBooking;
}

const Form = ({ booking, onSave }: Props): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { bookings } = useContext(BookingsContext);
  if (id) {
    const parsedId = parseInt(id, 10);
    booking = bookings.find((b) => b.id === parsedId);
  }

  function handleSubmit(
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) {
    const submittedBooking: InputBooking = {
      start: new Date(values.start).getTime(),
      end: new Date(values.end).getTime(),
      project: values.project,
    };
    if (booking && booking.id) {
      submittedBooking.id = booking.id;
    }
    dispatch(saveBooking(submittedBooking));
    onSave(submittedBooking);
    setSubmitting(false);
    resetForm();
    navigate('/');
  }

  return (
    <Formik
      initialValues={getInitialValues(booking)}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <label htmlFor="start" style={{ display: 'inline-block' }}>
            Start:
            <Field type="text" name="start" data-testid="form-start" />
            <ErrorMessage name="start" component="div" />
          </label>
          <label htmlFor="end" style={{ display: 'inline-block' }}>
            Ende:
            <Field type="text" name="end" data-testid="form-end" />
            <ErrorMessage name="end" component="div" />
          </label>
          <label htmlFor="project" style={{ display: 'inline-block' }}>
            Projekt:
            <Field type="text" name="project" data-testid="form-project" />
            <ErrorMessage name="project" component="div" />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="form-submit"
          >
            speichern
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
