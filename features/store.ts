import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients/clientsSlice';
import bookingsReducer from './bookings/bookingsSlice';
import templatesReducer from './templates/templatesSlice';
import chatReducer from './chat/chatSlice';
import notificationsReducer from './notifications/notificationsSlice';
import iotReducer from './iot/iotSlice';
import analyticsReducer from './analytics/analyticsSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    bookings: bookingsReducer,
    templates: templatesReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    iot: iotReducer,
    analytics: analyticsReducer,
    ui: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
