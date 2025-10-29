import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UiState } from '@/lib/types';

const initialState: UiState = {
  filters: {},
  activeToasts: [],
  bookingChatOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ key: string; value: string }>) {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilter(state, action: PayloadAction<string>) {
      delete state.filters[action.payload];
    },
    addToast(state, action: PayloadAction<{ id: string; title: string; description?: string }>) {
      state.activeToasts.push(action.payload);
    },
    removeToast(state, action: PayloadAction<string>) {
      state.activeToasts = state.activeToasts.filter((toast) => toast.id !== action.payload);
    },
    toggleBookingChat(state, action: PayloadAction<boolean | undefined>) {
      state.bookingChatOpen = action.payload ?? !state.bookingChatOpen;
    }
  }
});

export const { setFilter, clearFilter, addToast, removeToast, toggleBookingChat } = uiSlice.actions;
export default uiSlice.reducer;
