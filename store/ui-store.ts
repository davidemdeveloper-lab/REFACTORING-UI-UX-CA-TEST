'use client';

import { create } from 'zustand';

type UIState = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  selectedChatId: string | null;
  selectChat: (chatId: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  selectedChatId: null,
  selectChat: (chatId) => set({ selectedChatId: chatId }),
}));
