export type Booking = {
  id: number;
  start: number;
  end: number;
  project: string;
};

export type InputBooking = Omit<Booking, 'id'> & { id?: number };
