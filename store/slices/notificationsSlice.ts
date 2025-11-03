import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationsState {
  readIds: Record<string, boolean>;
  resolvedIds: Record<string, boolean>;
}

const initialState: NotificationsState = {
  readIds: {},
  resolvedIds: {},
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      state.readIds[action.payload] = true;
    },
    markNotificationAsResolved: (state, action: PayloadAction<string>) => {
      state.resolvedIds[action.payload] = true;
    },
    resetNotificationsState: () => initialState,
  },
});

export const {
  markNotificationAsRead,
  markNotificationAsResolved,
  resetNotificationsState,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

