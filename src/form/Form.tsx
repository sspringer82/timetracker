import { format } from 'date-fns';
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Booking, InputBooking } from '../Booking';

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

const Form = ({ booking, onSave }: Props): ReactElement => {
  const [formValues, setFormValues] = useState<FormValues>(initialBooking);

  useEffect(() => {
    if (booking) {
      setFormValues({
        start: format(booking.start, "yyyy-MM-dd'T'HH:mm"),
        end: format(booking.end, "yyyy-MM-dd'T'HH:mm"),
        project: booking.project,
      });
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const submittedBooking: InputBooking = {
      start: new Date(formValues.start).getTime(),
      end: new Date(formValues.end).getTime(),
      project: formValues.project,
    };
    if (booking && booking.id) {
      submittedBooking.id = booking.id;
    }
    onSave(submittedBooking);
    setFormValues(initialBooking);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="start">
        Start:
        <input
          type="text"
          name="start"
          value={formValues.start}
          onChange={handleChange}
          data-testid="form-start"
        />
      </label>
      <label htmlFor="end">
        Ende:
        <input
          type="text"
          name="end"
          value={formValues.end}
          onChange={handleChange}
          data-testid="form-end"
        />
      </label>
      <label htmlFor="project">
        Projekt:
        <input
          type="text"
          name="project"
          value={formValues.project}
          onChange={handleChange}
          data-testid="form-project"
        />
      </label>
      <button type="submit" data-testid="form-submit">
        speichern
      </button>
    </form>
  );
};

export default Form;
