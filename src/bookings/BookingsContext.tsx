import {
  ReactNode,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react';
import { Booking } from './Booking';

type ContextValue = {
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
};

const initialValue: ContextValue = {
  bookings: [],
  setBookings: () => {},
  filter: '',
  setFilter: () => {},
};

export const BookingsContext = createContext<ContextValue>(initialValue);

export const BookingsProvider = (props: {
  children: ReactNode;
}): ReactElement => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('');

  return (
    <BookingsContext.Provider
      value={{
        bookings: bookings.filter((booking) =>
          booking.project.includes(filter)
        ),
        setBookings,
        filter,
        setFilter,
      }}
      {...props}
    />
  );
};
