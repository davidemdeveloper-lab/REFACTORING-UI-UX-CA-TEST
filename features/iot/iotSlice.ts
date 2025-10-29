import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialDevices from '@/mock/iot.json';
import type { IoTDevice } from '@/lib/types';

type IoTState = {
  devices: IoTDevice[];
};

const initialState: IoTState = {
  devices: initialDevices as IoTDevice[]
};

const iotSlice = createSlice({
  name: 'iot',
  initialState,
  reducers: {
    updateDevice(state, action: PayloadAction<IoTDevice>) {
      const index = state.devices.findIndex((device) => device.id === action.payload.id);
      if (index >= 0) {
        state.devices[index] = action.payload;
      }
    }
  }
});

export const { updateDevice } = iotSlice.actions;
export default iotSlice.reducer;
