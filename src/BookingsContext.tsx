import {
  ReactNode,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react';
import { Booking } from './Booking';

type ContextValue = [Booking[], Dispatch<SetStateAction<Booking[]>>];

export const BookingsContext = createContext<ContextValue>([[], (e) => e]);

export const BookingsProvider = (props: {
  children: ReactNode;
}): ReactElement => {
  const bookingState = useState<Booking[]>([]);

  return <BookingsContext.Provider value={bookingState} {...props} />;
};
