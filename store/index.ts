import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './slices/notificationsSlice';
import uiReducer from './slices/uiSlice';
import { mockApi } from '@/services/mockApi';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    notifications: notificationsReducer,
    [mockApi.reducerPath]: mockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mockApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

