import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialNotifications from '@/mock/notifications.json';
import type { Notification } from '@/lib/types';

type NotificationsState = {
  items: Notification[];
};

const initialState: NotificationsState = {
  items: initialNotifications as Notification[]
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.items.find((item) => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead(state) {
      state.items.forEach((item) => {
        item.read = true;
      });
    }
  }
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
