import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import analyticsData from '@/mock/analytics.json';
import type { AnalyticsState } from '@/lib/types';

type AnalyticsSliceState = AnalyticsState & {
  range: '7d' | '30d' | '90d';
};

const initialState: AnalyticsSliceState = {
  ...(analyticsData as AnalyticsState),
  range: '30d'
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setRange(state, action: PayloadAction<AnalyticsSliceState['range']>) {
      state.range = action.payload;
    },
    setAnalytics(state, action: PayloadAction<AnalyticsState>) {
      state.occupancy = action.payload.occupancy;
      state.revenue = action.payload.revenue;
      state.services = action.payload.services;
    }
  }
});

export const { setRange, setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
