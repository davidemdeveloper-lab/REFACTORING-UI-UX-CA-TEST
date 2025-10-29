import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialBookings from '@/mock/bookings.json';
import type { Booking, BookingStatus } from '@/lib/types';

type BookingsState = {
  items: Booking[];
  statusFilter: BookingStatus | 'tutti';
};

const initialState: BookingsState = {
  items: initialBookings as Booking[],
  statusFilter: 'tutti'
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<Booking[]>) {
      state.items = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<BookingsState['statusFilter']>) {
      state.statusFilter = action.payload;
    },
    updateBooking(state, action: PayloadAction<Booking>) {
      const index = state.items.findIndex((booking) => booking.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    }
  }
});

export const { setBookings, setStatusFilter, updateBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
