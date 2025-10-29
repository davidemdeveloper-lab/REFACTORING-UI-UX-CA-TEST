import { create } from 'zustand';

type Channel = 'Direct' | 'Booking';

type PreferenceState = {
  chatChannel: Channel;
  setChatChannel: (channel: Channel) => void;
  notificationsFilter: 'tutte' | 'non-lette';
  setNotificationsFilter: (filter: 'tutte' | 'non-lette') => void;
};

export const usePreferences = create<PreferenceState>((set) => ({
  chatChannel: 'Direct',
  setChatChannel: (chatChannel) => set({ chatChannel }),
  notificationsFilter: 'tutte',
  setNotificationsFilter: (notificationsFilter) => set({ notificationsFilter }),
}));
