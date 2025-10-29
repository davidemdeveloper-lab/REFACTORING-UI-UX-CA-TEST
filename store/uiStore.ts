'use client';

import { create } from 'zustand';

interface UIState {
  isSideNavCollapsed: boolean;
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
  toggleSideNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSideNavCollapsed: false,
  selectedProperty: 'Aurora Sky Suites',
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  toggleSideNav: () =>
    set((state) => ({
      isSideNavCollapsed: !state.isSideNavCollapsed,
    })),
}));
