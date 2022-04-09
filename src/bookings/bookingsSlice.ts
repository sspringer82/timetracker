import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { Booking, InputBooking } from './Booking';
import { RootState } from '../store';

type BookingsState = Booking[];

const initialState: BookingsState = [];

export const loadBookings = createAsyncThunk('bookings/load', async () => {
  const response = await fetch('http://localhost:3001/bookings');
  return await response.json();
});

export const saveBooking = createAsyncThunk(
  'booking/save',
  async (booking: InputBooking) => {
    let method = 'POST';
    let url = 'http://localhost:3001/bookings';
    if (booking.id) {
      method = 'PUT';
      url = `${url}/${booking.id}`;
    }

    const response = await fetch(url, {
      method,
      body: JSON.stringify(booking),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }
);

export const removeBooking = createAsyncThunk(
  'booking/remove',
  async (id: number) => {
    await fetch(`http://localhost:3001/bookings/${id}`, { method: 'delete' });
    return id;
  }
);

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<InputBooking>) => {
      if (action.payload.id) {
        const bookingIndex = state.findIndex(
          (booking) => booking.id === action.payload.id
        );
        state[bookingIndex] = action.payload as Booking;
      } else {
        const nextId =
          state.reduce((maxId, booking) => Math.max(booking.id, maxId), -1) + 1;
        action.payload.id = nextId;
        state.push(action.payload as Booking);
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const bookingIndex = state.findIndex(
        (booking) => booking.id === action.payload
      );
      state.splice(bookingIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBookings.fulfilled, (state, action) => {
      state.splice(0, state.length, ...action.payload);
    });
    builder.addCase(saveBooking.fulfilled, (state, action) => {
      const bookingIndex = state.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (bookingIndex) {
        state[bookingIndex] = action.payload as Booking;
      } else {
        state.push(action.payload);
      }
    });
    builder.addCase(removeBooking.fulfilled, (state, action) => {
      const bookingIndex = state.findIndex(
        (booking) => booking.id === action.payload
      );
      state.splice(bookingIndex, 1);
    });
  },
});

export const { save, remove } = bookingsSlice.actions;

export const selectBookings = (state: RootState) => state.bookings;

export const selectFilteredBookings = (state: RootState) => {
  const filteredBookings: Record<string, Booking[]> = {};
  state.bookings.forEach((booking) => {
    const date = format(booking.start, 'yyyy-MM-dd');
    if (filteredBookings[date]) {
      filteredBookings[date].push(booking);
    } else {
      filteredBookings[date] = [booking];
    }
  });
  return filteredBookings;
};

export default bookingsSlice.reducer;
