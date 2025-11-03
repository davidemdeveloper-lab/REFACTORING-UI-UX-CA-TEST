import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SidebarRoute =
  | 'dashboard'
  | 'customers'
  | 'bookings'
  | 'templates'
  | 'chat'
  | 'iot';

interface UIState {
  sidebarCollapsed: boolean;
  notificationCenterOpen: boolean;
  activeSidebarRoute: SidebarRoute;
  selectedConversationId?: string;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  notificationCenterOpen: false,
  activeSidebarRoute: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    openNotificationCenter: (state) => {
      state.notificationCenterOpen = true;
    },
    closeNotificationCenter: (state) => {
      state.notificationCenterOpen = false;
    },
    setActiveSidebarRoute: (state, action: PayloadAction<SidebarRoute>) => {
      state.activeSidebarRoute = action.payload;
    },
    setSelectedConversationId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedConversationId = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  openNotificationCenter,
  closeNotificationCenter,
  setActiveSidebarRoute,
  setSelectedConversationId,
} = uiSlice.actions;

export default uiSlice.reducer;

